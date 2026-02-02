"use strict";
const bootstrap = ({ strapi: strapi2 }) => {
};
const destroy = ({ strapi: strapi2 }) => {
};
const register = ({ strapi: strapi2 }) => {
  strapi2.documents.use(async (context, next) => {
    const result = await next();
    if ((context.uid === "api::call.call" || context.uid === "api::expert-profile.expert-profile") && (context.action === "create" || context.action === "update")) {
      try {
        await strapi2.plugin("admin-pannel").service("liveCallsService").callsData();
      } catch (error) {
        strapi2.log.error("Error in liveCallsService middleware:", error);
      }
    }
    return result;
  });
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const LIST_DELIMITER_REGEX = /[\n,]/;
const sanitizeDataPayload = (data) => {
  if (!data || typeof data !== "object") return void 0;
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== void 0 && value !== null).map(([key, value]) => [
      key,
      typeof value === "string" ? value : typeof value === "object" ? JSON.stringify(value) : String(value)
    ])
  );
};
const tryParseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
const pushIfStringList = (rawValue, push, emit) => {
  if (typeof rawValue !== "string") {
    push(rawValue);
    return;
  }
  const trimmed = rawValue.trim();
  if (!trimmed) return;
  const firstChar = trimmed[0];
  const lastChar = trimmed[trimmed.length - 1];
  const looksLikeJsonArray = firstChar === "[" && lastChar === "]";
  const looksLikeJsonString = firstChar === `"` && lastChar === `"`;
  if (looksLikeJsonArray || looksLikeJsonString) {
    const parsed = tryParseJson(trimmed);
    if (parsed !== null && parsed !== void 0) {
      push(parsed);
      return;
    }
  }
  if (LIST_DELIMITER_REGEX.test(trimmed)) {
    trimmed.split(LIST_DELIMITER_REGEX).map((segment) => segment.trim()).filter(Boolean).forEach((segment) => push(segment));
    return;
  }
  emit(trimmed);
};
const INVALID_FCM_CODES = /* @__PURE__ */ new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token"
]);
const isInvalidFirebaseTokenError = (error) => {
  if (!error) return false;
  const code = error.code || error.errorInfo?.code;
  if (code && INVALID_FCM_CODES.has(code)) return true;
  const message = error.message || error.errorInfo?.message;
  return typeof message === "string" && message.toLowerCase().includes("requested entity was not found");
};
async function sendToTokens(tokens, { notification, data, android, apns, ttlSeconds = 300 }) {
  const safeData = sanitizeDataPayload(data);
  const clean = uniqueTokens(normalizeFirebaseTokens(tokens));
  if (clean.length === 0) {
    return { successCount: 0, failureCount: 0, invalidTokens: [] };
  }
  const androidConfig = {
    priority: "high",
    ttl: ttlSeconds * 1e3,
    collapseKey: safeData?.type || "default",
    ...android
  };
  const apnsConfig = {
    headers: { "apns-priority": "10" },
    ...apns
  };
  if (clean.length === 1) {
    try {
      await admin.messaging().send({
        token: clean[0],
        notification,
        data: safeData,
        android: androidConfig,
        apns: apnsConfig
      });
      return { successCount: 1, failureCount: 0, invalidTokens: [] };
    } catch (error) {
      if (isInvalidFirebaseTokenError(error)) {
        return { successCount: 0, failureCount: 1, invalidTokens: clean };
      }
      throw error;
    }
  }
  const res = await admin.messaging().sendEachForMulticast({
    tokens: clean,
    notification,
    data: safeData,
    android: androidConfig,
    apns: apnsConfig
  });
  const invalidTokens = [];
  if (Array.isArray(res?.responses)) {
    res.responses.forEach((response, index2) => {
      if (!response.success && isInvalidFirebaseTokenError(response.error)) {
        invalidTokens.push(clean[index2]);
      }
    });
  }
  return {
    successCount: res.successCount ?? 0,
    failureCount: res.failureCount ?? 0,
    invalidTokens
  };
}
const resolvePopulatedEntry = (entry) => {
  if (!entry) return null;
  if (Array.isArray(entry)) {
    return resolvePopulatedEntry(entry[0]);
  }
  if (entry?.data) {
    return resolvePopulatedEntry(entry.data);
  }
  return entry;
};
const normalizeFirebaseTokens = (value) => {
  if (value === null || value === void 0) return [];
  const initial = Array.isArray(value) ? value.flat(Infinity) : [value];
  const tokens = [];
  const emitToken = (token) => {
    if (token === null || token === void 0) return;
    tokens.push(String(token));
  };
  const pushValue = (entry) => {
    if (entry === null || entry === void 0) return;
    if (Array.isArray(entry)) {
      entry.forEach(pushValue);
      return;
    }
    if (typeof entry === "string") {
      pushIfStringList(entry, pushValue, emitToken);
      return;
    }
    emitToken(entry);
  };
  initial.forEach(pushValue);
  return tokens.filter(Boolean);
};
const uniqueTokens = (tokens) => {
  if (!Array.isArray(tokens)) return [];
  return Array.from(new Set(tokens.filter(Boolean)));
};
const DEFAULT_LOGO_URL = "https://callingappdev.s3.ap-south-1.amazonaws.com/avatars/CE_Logo_Icon_e8fa8dff79.png";
const buildFallback = (overrides = {}) => ({
  name: process.env.PLATFORM_NAME || "Consultease",
  supportEmail: process.env.PLATFORM_SUPPORT_EMAIL || "support@consultease.com",
  logo: DEFAULT_LOGO_URL,
  companyProfile: null,
  monthlyStatementBottomContent: [],
  ...overrides
});
const toAbsoluteUrl = (url) => {
  if (!url) {
    return null;
  }
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  const baseUrl = process.env.STRAPI_ADMIN_BACKEND_URL || process.env.STRAPI_BACKEND_URL || process.env.STRAPI_URL || "";
  if (!baseUrl) {
    return url;
  }
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = String(url).replace(/^\//, "");
  return `${normalizedBase}/${normalizedPath}`;
};
const extractMediaEntry = (media) => {
  if (!media) {
    return null;
  }
  if (Array.isArray(media)) {
    return extractMediaEntry(media[0]);
  }
  if (media?.data) {
    return extractMediaEntry(media.data);
  }
  if (media?.attributes) {
    return extractMediaEntry(media.attributes);
  }
  return media;
};
const resolveMediaUrl = (media) => {
  const entry = extractMediaEntry(media);
  if (!entry) {
    return null;
  }
  const url = entry.url || entry.formats?.large?.url || entry.formats?.medium?.url || entry.formats?.small?.url || entry.formats?.thumbnail?.url || null;
  return toAbsoluteUrl(url);
};
const normalizeBlocksField = (value) => {
  if (!value) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  if (value?.document && Array.isArray(value.document)) {
    return value.document;
  }
  return [];
};
async function loadPlatformInfo(strapi2, options = {}) {
  if (!strapi2) {
    throw new Error("A Strapi instance is required to load platform info");
  }
  const fallback = buildFallback(options.fallback);
  const logger = options.logger || strapi2.log;
  const model = typeof strapi2.contentType === "function" && strapi2.contentType("api::app-config.app-config") || typeof strapi2.getModel === "function" && strapi2.getModel("api::app-config.app-config") || {};
  const attrs = model.attributes || {};
  const bottomContentField = (() => {
    if ("monthly_statement_bottom_content" in attrs) {
      return "monthly_statement_bottom_content";
    }
    if ("monthly_statment_bottom_content" in attrs) {
      return "monthly_statment_bottom_content";
    }
    return null;
  })();
  const shouldPopulateBottomContent = bottomContentField && ["relation", "component", "dynamiczone", "media"].includes(
    attrs[bottomContentField]?.type
  );
  try {
    const populate = {
      logo: true,
      company_profile: {
        populate: {
          wallets: true,
          expert: true,
          gst_detail: {
            populate: {
              GST: {
                populate: {
                  state: true,
                  country: true,
                  city: true,
                  district: true
                }
              }
            }
          }
        }
      }
    };
    if (shouldPopulateBottomContent) {
      populate[bottomContentField] = true;
    }
    const config2 = await strapi2.documents("api::app-config.app-config").findFirst({
      status: "published",
      populate
    });
    if (!config2) {
      return fallback;
    }
    const cpWallets = config2.company_profile?.wallets || [];
    const earningsWallet = cpWallets.find((w) => w.wallet_type === "EARNINGS_WALLET");
    const primaryWallet = earningsWallet || cpWallets[0] || null;
    let companyProfile = {
      name: config2.company_profile?.name || fallback.name,
      supportEmail: config2.supportEmail || "abc@xyz.com",
      logo: resolveMediaUrl(config2.logo) || fallback.logo,
      companyProfile: config2.company_profile,
      monthlyStatementBottomContent: normalizeBlocksField(
        bottomContentField && config2[bottomContentField] || config2.monthly_statement_bottom_content || config2.monthly_statment_bottom_content
      ),
      wallet: primaryWallet,
      // Backwards compatibility / Main usage
      wallets: cpWallets,
      // Expose all if needed
      gstDetail: config2.company_profile?.gst_detail || null,
      expert: config2.company_profile?.expert || null,
      is_live: config2.company_profile?.documentId ? true : false
    };
    return companyProfile;
  } catch (error) {
    if (logger?.warn) {
      logger.warn(
        `[platform-info] Unable to load app-config: ${error.message}`
      );
    } else {
      console.warn("[platform-info] Unable to load app-config:", error);
    }
    return {
      ...fallback
    };
  }
}
const getWallet = async (userId, type) => {
  if (!userId) return null;
  const wallets = await strapi.entityService.findMany("api::wallet.wallet", {
    filters: {
      user: userId,
      wallet_type: type
    },
    limit: 1
  });
  if (wallets && wallets.length > 0) {
    return wallets[0];
  }
  try {
    const newWallet = await strapi.entityService.create("api::wallet.wallet", {
      data: {
        user: userId,
        balance: 0,
        isActive: true,
        wallet_type: type
      }
    });
    return newWallet;
  } catch (err) {
    strapi.log.error(`Failed to create ${type} wallet for user ${userId}:`, err);
    return null;
  }
};
const dashboard = ({ strapi: strapi2 }) => ({
  async stream(ctx) {
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.status = 200;
    await strapi2.plugin("admin-pannel").service("liveCallsService").callsData(ctx.res);
    const hb = setInterval(() => {
      try {
        ctx.res.write(`: ping ${Date.now()}

`);
      } catch {
      }
    }, 15e3);
    ctx.req.on("close", () => {
      clearInterval(hb);
      strapi2.plugin("admin-pannel").service("sse").removeClient(ctx.res);
    });
    ctx.respond = false;
  },
  // ----------------------------------------------------------
  // GET /api/call/recent-calls 
  // ----------------------------------------------------------
  async recentCalls(ctx) {
    try {
      const knex = strapi2.db.connection;
      const clientFilters = ctx.query?.filters || {};
      const paginationQuery = ctx.query?.pagination || {};
      let page = Math.max(1, Number(paginationQuery.page) || 1);
      let pageSize = Math.min(50, Math.max(1, Number(paginationQuery.pageSize) || 20));
      const offset = (page - 1) * pageSize;
      const startTimeGte = clientFilters.createdAt?.$gte;
      const startTimeLte = clientFilters.createdAt?.$lte;
      const statusFilter = clientFilters.callStatus;
      const rows = await knex("calls as c").leftJoin("calls_caller_lnk as c_lnk", "c.id", "c_lnk.call_id").leftJoin("public_users as u_caller", "c_lnk.public_user_id", "u_caller.id").leftJoin("calls_receiver_lnk as r_lnk", "c.id", "r_lnk.call_id").leftJoin("public_users as u_receiver", "r_lnk.public_user_id", "u_receiver.id").leftJoin("calls_categories_lnk as cat_lnk", "c.id", "cat_lnk.call_id").leftJoin("categories as cat", "cat_lnk.category_id", "cat.id").leftJoin("calls_review_lnk as rev_lnk", "c.id", "rev_lnk.call_id").leftJoin("reviews as rev", "rev_lnk.review_id", "rev.id").where((qb) => {
        qb.whereNotIn("c.call_status", ["pending", "ongoing"]);
        if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
        if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
        if (statusFilter) {
          if (typeof statusFilter === "string") qb.where("c.call_status", statusFilter);
          else if (statusFilter.$eq) qb.where("c.call_status", statusFilter.$eq);
          else if (statusFilter.$in) qb.whereIn("c.call_status", statusFilter.$in);
        }
      }).select({
        id: "c.id",
        type: "c.type",
        documentId: "c.document_id",
        time: "c.start_time",
        duration: "c.duration",
        caller: "u_caller.name",
        expert: "u_receiver.name",
        category: "cat.name",
        rating: knex.raw("COALESCE(rev.rating, 0)"),
        revenue: knex.raw("COALESCE(c.total_cost, 0)"),
        status: "c.call_status",
        total_count: knex.raw("count(*) over()")
      }).orderBy("c.created_at", "desc").offset(offset).limit(pageSize);
      console.table(rows);
      const total = rows.length > 0 ? parseInt(rows[0].total_count) : 0;
      return ctx.send({
        data: rows,
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(total / pageSize),
            total
          }
        }
      });
    } catch (error) {
      strapi2.log.error("recentCalls error", error);
      return ctx.internalServerError(error.message || "recentCalls failed");
    }
  },
  // ----------------------------------------------------------
  // GET /api/category-stats
  // ----------------------------------------------------------
  async categoryStats(ctx) {
    try {
      const clientFilters = ctx.query?.filters || {};
      const knex = strapi2.db.connection;
      const startTimeGte = clientFilters.startTime?.$gte || clientFilters.createdAt?.$gte;
      const startTimeLte = clientFilters.startTime?.$lte || clientFilters.createdAt?.$lte;
      const rows = await knex("calls as c").leftJoin("calls_categories_lnk as ccl", "c.id", "ccl.call_id").leftJoin("categories as cat", "ccl.category_id", "cat.id").leftJoin("calls_review_lnk as crl", "c.id", "crl.call_id").leftJoin("reviews as rev", "crl.review_id", "rev.id").select(knex.raw(`COALESCE(TRIM(cat.name), 'Others') as "name"`)).select(knex.raw(`SUM(CASE WHEN c.type = 'videoCall' THEN 1 ELSE 0 END) as "videoCalls"`)).select(knex.raw(`SUM(CASE WHEN c.type <> 'videoCall' THEN 1 ELSE 0 END) as "calls"`)).select(knex.raw(`SUM(COALESCE(c.duration, 0)) as "minutes"`)).select(knex.raw(`ROUND(AVG(CASE WHEN rev.rating IS NOT NULL THEN rev.rating ELSE 0 END), 1) as "avgRating"`)).where((qb) => {
        if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
        if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
      }).groupByRaw(`COALESCE(TRIM(cat.name), 'Others')`).orderByRaw(`COUNT(*) DESC`);
      console.table(rows);
      return ctx.send(rows);
    } catch (error) {
      strapi2.log.error("categoryStats error", error);
      return ctx.internalServerError(error.message || "categoryStats failed");
    }
  },
  // ----------------------------------------------------------
  // POST /admin/callend  (server-side billing & invoice)
  // Also (optionally) notify both sides with CALL_ENDED
  // ----------------------------------------------------------
  async Callend(ctx) {
    console.log("🔔 [Callend] Called");
    try {
      const { callId } = ctx.request.body || {};
      const adminUser = ctx.state.user || {};
      console.log("🔔 [Callend] adminUser", adminUser);
      const endedByInfo = {
        id: adminUser.id,
        name: `${adminUser.firstname || ""} ${adminUser.lastname || ""}`.trim(),
        role: adminUser.roles?.[0]?.name || "Admin",
        documentId: adminUser.documentId
      };
      const endTime = /* @__PURE__ */ new Date();
      if (!callId) {
        console.warn("🔔 [Callend] Missing callId");
        return ctx.badRequest("callId is required");
      }
      const platformInfo = await loadPlatformInfo(strapi2, { logger: strapi2.log });
      if (platformInfo.is_live === false) {
        console.warn("🔔 [Callend] Platform maintenance mode");
        return ctx.badRequest("Platform is under maintenance");
      }
      const existingCall = await strapi2.entityService.findOne(
        "api::call.call",
        callId,
        {
          populate: {
            caller: { populate: ["wallets"] },
            receiver: { populate: ["wallets", "expert", "expert.rates"] }
          }
        }
      );
      if (!existingCall) {
        console.warn("🔔 [Callend] Call not found:", callId);
        return ctx.notFound("Call not found");
      }
      if (existingCall.callStatus === "completed") {
        console.warn("🔔 [Callend] Call already completed:", callId);
        return ctx.badRequest("Call has been Ended already");
      }
      const startTime = existingCall.startTime ? new Date(existingCall.startTime) : null;
      const type = existingCall.type;
      if ((!startTime || isNaN(startTime.getTime())) && existingCall.callStatus === "pending") {
        console.log("🔔 [Callend] Call never started (pending). Marking as declined.");
        const declinedMetadata = {
          reason: "Call ended before start (Declined/Missed)",
          endedByInfo,
          callStatus: "force complete by admin",
          callerId: existingCall.caller.id,
          receiverId: existingCall.receiver.id,
          callerName: existingCall.caller.name,
          receiverName: existingCall.receiver.name,
          callType: existingCall.type,
          callId: existingCall.id
        };
        const declinedCall = await strapi2.entityService.update(
          "api::call.call",
          callId,
          {
            data: {
              callStatus: "force complete by admin",
              endTime: endTime || /* @__PURE__ */ new Date(),
              duration: 0,
              totalCost: 0,
              duration_sec: 0,
              metadata: declinedMetadata
            },
            populate: {
              caller: { populate: ["wallets"] },
              receiver: { populate: ["wallets"] }
            }
          }
        );
        try {
          const callerUser = await strapi2.entityService.findOne("api::public-user.public-user", existingCall.caller.id, { fields: ["firebaseTokens"] });
          const receiverUser = await strapi2.entityService.findOne("api::public-user.public-user", existingCall.receiver.id, { fields: ["firebaseTokens"] });
          const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
          if (tokens.length) {
            await sendToTokens(tokens, {
              data: {
                type: "CALL_ENDED",
                callId: String(callId),
                dismissNotification: "true",
                status: "declined"
              },
              android: { priority: "high" }
            });
          }
        } catch (e) {
          console.warn("🔔 [Callend] Notification error:", e);
        }
        return ctx.send({
          success: true,
          call: declinedCall,
          message: "Call declined/cancelled (not started)."
        });
      }
      if (!startTime || isNaN(startTime.getTime())) {
        console.warn("🔔 [Callend] Invalid start time:", existingCall.startTime);
        return ctx.badRequest("Call has no valid start time.");
      }
      const endTimeDate = endTime;
      let durationSec = Math.floor((endTimeDate.getTime() - startTime.getTime()) / 1e3);
      if (durationSec < 0) durationSec = 0;
      if (!Number.isFinite(durationSec)) durationSec = 0;
      const durationMin = (durationSec / 60).toFixed(2);
      const minutes = Math.max(1, Math.ceil(durationSec / 60));
      const receiverRates = existingCall.receiver.expert.rates;
      let rate = 0;
      if (type === "videoCall") {
        rate = receiverRates && receiverRates.videoCallRate != null ? Number(receiverRates.videoCallRate) : 0;
      } else if (type === "voiceCall") {
        rate = receiverRates && receiverRates.voiceCallRate != null ? Number(receiverRates.voiceCallRate) : 0;
      }
      const totalCost = minutes * rate;
      console.log("🔔 [Callend] Calculated:", { durationSec, durationMin, minutes, rate, totalCost });
      const [pricingRaw] = await Promise.all([
        strapi2.entityService.findMany("api::pricing-config.pricing-config", { limit: 1 })
      ]);
      const settings = Array.isArray(pricingRaw) ? pricingRaw[0] : pricingRaw;
      if (!settings) {
        console.warn("🔔 [Callend] Pricing config missing");
        return ctx.badRequest("Pricing config not found.");
      }
      const adminWallet = resolvePopulatedEntry(platformInfo?.wallet);
      if (!adminWallet?.id) {
        const companyProfile = resolvePopulatedEntry(platformInfo?.companyProfile);
        console.warn("🔔 [Callend] Admin wallet missing in platformInfo", {
          companyProfileId: companyProfile?.id,
          platformInfoWallet: platformInfo?.wallet
        });
        return ctx.badRequest("Admin wallet `not found.");
      }
      const caller = existingCall.caller;
      const receiver = existingCall.receiver;
      const callerWallet = await getWallet(caller.id, "CASH_WALLET");
      const receiverWallet = await getWallet(receiver.id, "EARNINGS_WALLET");
      if (!callerWallet) {
        console.warn("🔔 [Callend] Caller CASH_WALLET missing", caller.id);
        return ctx.badRequest("Caller wallet not found.");
      }
      if (!receiverWallet) {
        console.warn("🔔 [Callend] Receiver EARNINGS_WALLET missing/failed create", receiver.id);
        return ctx.badRequest("Receiver wallet error.");
      }
      const commissionPercentagePerMin = type === "voiceCall" ? Number(settings.VoiceCall_Percentage_Commission || 0) : Number(settings.VideoCall_Percentage_Commission || 0);
      const minimumFixedCommission = type === "voiceCall" ? Number(settings.Minimum_VoiceCall_Commission_Fixed || 0) : Number(settings.Minimum_videoCall_Commission_Fixed || 0);
      const costPerMinute = totalCost / (minutes || 1);
      const percentageBasedCommission = costPerMinute * (commissionPercentagePerMin / 100) * minutes;
      const platformFee = Math.max(percentageBasedCommission, minimumFixedCommission);
      const expertPayout = totalCost - platformFee;
      const commonMetadata = {
        callId: String(callId),
        endedByInfo,
        channelName: existingCall.channelName,
        callType: type,
        callerId: caller.id,
        callerName: caller.username || caller.email,
        receiverId: receiver.id,
        receiverName: receiver.username || receiver.email,
        receiverDocId: receiver.expert ? receiver.expert.documentId : "Null",
        startTime,
        endTime,
        durationSec,
        durationMin,
        ratePerMin: rate,
        commissionPercentage: commissionPercentagePerMin,
        minFixedCommission: minimumFixedCommission,
        totalCost,
        platformFee,
        expertEarnings: expertPayout,
        breakdown: {
          rate,
          minutes,
          formula: `${rate} * ${minutes}`
        }
      };
      const updatedCall = await strapi2.entityService.update(
        "api::call.call",
        callId,
        {
          data: {
            callStatus: "force complete by admin",
            endTime,
            duration: Number(durationMin || 0),
            // Actual duration
            totalCost: Number(totalCost || 0),
            // Billed cost (min 1 min)
            type,
            duration_sec: durationSec,
            metadata: commonMetadata
            // Sync metadata
          },
          populate: {
            caller: { populate: ["wallets"] },
            receiver: { populate: ["wallets"] }
          }
        }
      );
      if (minutes <= 0 || totalCost <= 0) {
        try {
          const callerUser = await strapi2.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
          const receiverUser = await strapi2.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
          const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
          if (tokens.length) {
            await sendToTokens(tokens, {
              data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
              android: { priority: "high" }
            });
          }
        } catch (e) {
          strapi2.log.warn("CALL_ENDED push skipped:", e?.message || e);
        }
        return ctx.send({
          success: true,
          call: updatedCall,
          message: "Call ended (no billing)."
        });
      }
      const transactionId = `TXN-${Date.now()}`;
      const callChargeTxn = await strapi2.entityService.create(
        "api::transaction.transaction",
        {
          data: {
            amount: totalCost,
            // Amount Charged
            transactionType: "transfer",
            method: "walletTowallet",
            paymentStatus: "success",
            FromWallet: callerWallet.id,
            to_wallet: adminWallet.id,
            // Platform receives full amount
            call: callId,
            transaction_Id: `${transactionId}-CHARGE`,
            Note: `₹ ${totalCost} go from ${caller.username || caller.email} to Platform`,
            metadata: {
              ...commonMetadata,
              description: "Call Cost paid to Platform",
              type: "CALL_CHARGE"
            }
          }
        }
      );
      const expertPayoutTxn = await strapi2.entityService.create(
        "api::transaction.transaction",
        {
          data: {
            amount: expertPayout,
            // Earnings Paid
            transactionType: "transfer",
            method: "walletTowallet",
            paymentStatus: "success",
            FromWallet: adminWallet.id,
            // Platform pays Expert
            to_wallet: receiverWallet.id,
            user: receiver.id,
            // Link to expert user
            call: callId,
            transaction_Id: `${transactionId}`,
            Note: `₹ ${expertPayout} go from Platform to ${receiver.username || receiver.email}`,
            metadata: {
              ...commonMetadata,
              description: "Expert Payout from Platform",
              type: "EXPERT_PAYOUT"
            }
          }
        }
      );
      try {
        if (receiver?.expert?.documentId) {
          try {
            await strapi2.documents("api::expert-profile.expert-profile").update({
              documentId: receiver.expert.documentId,
              data: { user_status: "online" }
            });
            strapi2.log.info(
              `✅ Set Expert ${receiver.id} status to 'online' (Call Ended)`
            );
          } catch (statusErr) {
            strapi2.log.error(
              `Failed to set Expert ${receiver.id} status to 'online' (Call Ended):`,
              statusErr
            );
          }
        }
        const expertId = receiver?.expert?.id;
        if (expertId) {
          await strapi2.service("api::call.call").incrementExpertDurations({
            expertId,
            minutes: Number(durationMin || 0)
          });
        }
      } catch (e) {
        strapi2.log.warn("incrementExpertDurations failed:", e?.message || e);
      }
      try {
        const callerUser = await strapi2.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
        const receiverUser = await strapi2.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
        const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
        if (tokens.length) {
          await sendToTokens(tokens, {
            data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
            android: { priority: "high" }
          });
        }
      } catch (e) {
        strapi2.log.warn("CALL_ENDED push skipped:", e?.message || e);
      }
      return ctx.send({
        success: true,
        call: updatedCall,
        transactions: [callChargeTxn, expertPayoutTxn],
        message: "Call ended and billed successfully."
      });
    } catch (error) {
      strapi2.log.error("Callend Error:", error);
      return ctx.internalServerError("An error occurred while ending call.");
    }
  }
});
const controllers = {
  dashboard
};
const middlewares = {};
const policies = {};
const routes = {
  "admin-pannel": {
    type: "admin",
    routes: [
      {
        method: "GET",
        path: "/stream",
        handler: "dashboard.stream",
        config: { policies: [], auth: false }
      },
      {
        method: "GET",
        path: "/category-stats",
        handler: "dashboard.categoryStats",
        config: { policies: [] }
      },
      {
        method: "GET",
        path: "/recent-calls",
        handler: "dashboard.recentCalls",
        config: { policies: [], auth: false }
      },
      {
        method: "POST",
        path: "/callend",
        handler: "dashboard.Callend",
        config: { policies: [] }
      }
    ]
  }
};
const liveCallsService = ({ strapi: strapi2 }) => ({
  async callsData(res) {
    try {
      const date = /* @__PURE__ */ new Date();
      const today = date.setHours(0, 0, 0, 0);
      const calls = await strapi2.entityService.findMany("api::call.call", {
        filters: { createdAt: { $gte: today } },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: "desc" }
      });
      const expertsOnline = await strapi2.entityService.findMany("api::expert-profile.expert-profile", { filters: { isActive: true }, fields: ["id"] });
      const init = () => ({
        liveCalls: 0,
        callsToday: 0,
        declinedCalls: 0,
        completedCalls: 0,
        avgDuration: 0
      });
      const stats = {
        voice: init(),
        video: init(),
        expertsOnline: expertsOnline.length
      };
      for (const call of calls) {
        const bucket = call.type === "voiceCall" ? stats.voice : call.type === "videoCall" ? stats.video : null;
        if (!bucket) continue;
        bucket.callsToday++;
        if (call.callStatus === "ongoing") bucket.liveCalls++;
        if (call.callStatus === "declined") bucket.declinedCalls++;
        if (call.callStatus === "completed") bucket.completedCalls++;
        bucket.avgDuration += Number(call.duration) || 0;
      }
      const liveCalls = calls.filter((call) => /ongoing|pending/i.test(call.callStatus)).slice(0, 8).map((call) => {
        return {
          id: call.id,
          documentId: call.documentId,
          caller: call.caller?.name,
          expert: call.receiver?.name,
          type: call.type,
          startTime: call.startTime,
          status: call.callStatus,
          duration: call.duration,
          category: call.categories?.[0]?.name
        };
      });
      if (res) {
        res.write(`data: ${JSON.stringify({ stats, liveCalls })}

`);
        strapi2.plugin("admin-pannel").service("sse").addClient(res);
      } else {
        strapi2.plugin("admin-pannel").service("sse").broadcast({ stats, liveCalls });
      }
    } catch (error) {
      strapi2.log.error("dashboardData error", error);
      return { error: error || "dashboardData failed" };
    }
  }
});
const sseService = ({ strapi: strapi2 }) => {
  const clients = /* @__PURE__ */ new Set();
  return {
    addClient(res) {
      clients.add(res);
    },
    removeClient(res) {
      clients.delete(res);
    },
    broadcast(data) {
      for (const client of clients) {
        if (client.destroyed || client.writableEnded) {
          clients.delete(client);
          continue;
        }
        client.write(`data: ${JSON.stringify(data)}

`);
      }
    }
  };
};
const services = {
  liveCallsService,
  sse: sseService
};
const index = {
  bootstrap,
  destroy,
  register,
  config,
  controllers,
  contentTypes,
  middlewares,
  policies,
  routes,
  services
};
module.exports = index;
