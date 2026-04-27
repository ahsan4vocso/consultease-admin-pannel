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
        await strapi2.plugin("admin-pannel").service("dashboard").broadcast();
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
const calling = ({ strapi: strapi2 }) => ({
  // ----------------------------------------------------------
  // 1. GET /admin-pannel/stream
  // ----------------------------------------------------------
  async stream(ctx) {
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.status = 200;
    try {
      const stats = await strapi2.plugin("admin-pannel").service("dashboard").getDashboardStats({}) || {};
      ctx.res.write(`data: ${JSON.stringify({ stats })}

`);
    } catch (e) {
      strapi2.log.error("Stream stats push failed", e);
    }
    try {
      const liveCalls = await strapi2.plugin("admin-pannel").service("dashboard").getLiveCalls() || [];
      ctx.res.write(`data: ${JSON.stringify({ liveCalls })}

`);
    } catch (e) {
      strapi2.log.error("Stream liveCalls push failed", e);
    }
    try {
      const recent = await strapi2.plugin("admin-pannel").service("dashboard").getRecentCalls({ pagination: { pageSize: 20 } }) || { data: [] };
      ctx.res.write(`data: ${JSON.stringify({ recentCalls: recent.data || [] })}

`);
    } catch (e) {
      strapi2.log.error("Stream recentCalls push failed", e);
    }
    try {
      const categoryStats = await strapi2.plugin("admin-pannel").service("dashboard").getCategoryStats({}) || [];
      ctx.res.write(`data: ${JSON.stringify({ categoryStats })}

`);
    } catch (e) {
      strapi2.log.error("Stream categoryStats push failed", e);
    }
    strapi2.plugin("admin-pannel").service("sse").addClient(ctx.res);
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
  // 2. GET /admin-pannel/recent-calls
  // ----------------------------------------------------------
  async recentCalls(ctx) {
    try {
      const result = await strapi2.plugin("admin-pannel").service("dashboard").getRecentCalls({
        filters: ctx.query?.filters || {},
        pagination: ctx.query?.pagination || {}
      });
      return ctx.send(result);
    } catch (error) {
      strapi2.log.error("recentCalls error", error);
      return ctx.internalServerError(error.message || "recentCalls failed");
    }
  },
  // ----------------------------------------------------------
  // 3. GET /admin-pannel/category-stats
  // ----------------------------------------------------------
  async categoryStats(ctx) {
    try {
      const rows = await strapi2.plugin("admin-pannel").service("dashboard").getCategoryStats({
        filters: ctx.query?.filters || {}
      });
      return ctx.send(rows);
    } catch (error) {
      strapi2.log.error("categoryStats error", error);
      return ctx.internalServerError(error.message || "categoryStats failed");
    }
  },
  // ----------------------------------------------------------
  // 4. GET /admin-pannel/stats
  // ----------------------------------------------------------
  async getStats(ctx) {
    try {
      const stats = await strapi2.plugin("admin-pannel").service("dashboard").getDashboardStats({
        filters: ctx.query?.filters || {}
      });
      return ctx.send(stats);
    } catch (error) {
      strapi2.log.error("getStats error", error);
      return ctx.internalServerError(error.message || "getStats failed");
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
      return ctx.internalServerError(error);
    }
  }
});
const referral = ({ strapi: strapi2 }) => ({
  async stats(ctx) {
    try {
      const knex = strapi2.db.connection;
      const result = await knex.raw(`
        WITH months_range AS (
  SELECT generate_series(
    date_trunc('month', CURRENT_DATE) - interval '4 months',
    date_trunc('month', CURRENT_DATE),
    interval '1 month'
  )::date AS month_start
),

user_stats_map AS (
  SELECT
    lnk.public_user_id,
    MAX(COALESCE(us.total_wallet_topup, 0)) AS total_wallet_topup
  FROM user_statistics_public_profile_lnk lnk
  JOIN user_statistics us
    ON us.id = lnk.user_statistic_id
  GROUP BY lnk.public_user_id
),

expert_map AS (
  SELECT
    lnk.public_user_id,
    BOOL_OR(COALESCE(ep.is_approved, false)) AS is_approved
  FROM expert_profiles_user_lnk lnk
  JOIN expert_profiles ep
    ON ep.id = lnk.expert_profile_id
  GROUP BY lnk.public_user_id
),

wallet_user_map AS (
  SELECT DISTINCT
    lnk.wallet_id,
    lnk.public_user_id
  FROM wallets_user_lnk lnk
),

base_users AS (
  SELECT
    u.id,
    u.role,
    u.created_at,
    NULLIF(BTRIM(u.referrer_code), '') AS normalized_referrer_code,
    COALESCE(usm.total_wallet_topup, 0) AS total_wallet_topup,
    COALESCE(emap.is_approved, false) AS is_approved,

    CASE
      WHEN NULLIF(BTRIM(u.referrer_code), '') IS NOT NULL THEN true
      ELSE false
    END AS is_referred,

    CASE
      WHEN u.role = 'Client' AND COALESCE(usm.total_wallet_topup, 0) > 0 THEN true
      WHEN u.role = 'Expert' AND COALESCE(emap.is_approved, false) = true THEN true
      ELSE false
    END AS is_converted

  FROM public_users u
  LEFT JOIN user_stats_map usm
    ON usm.public_user_id = u.id
  LEFT JOIN expert_map emap
    ON emap.public_user_id = u.id
),

user_metrics AS (
  SELECT
    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Client'
    )::int AS ref_client,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Expert'
    )::int AS ref_expert,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Client'
        AND is_converted = true
    )::int AS ref_conv_client,

    COUNT(*) FILTER (
      WHERE is_referred = true
        AND role = 'Expert'
        AND is_converted = true
    )::int AS ref_conv_expert,

    COUNT(*) FILTER (
      WHERE is_referred = false
        AND role = 'Client'
        AND is_converted = true
    )::int AS direct_conv_client,

    COUNT(*) FILTER (
      WHERE is_referred = false
        AND role = 'Expert'
        AND is_converted = true
    )::int AS direct_conv_expert,

    CASE
      WHEN COUNT(*) FILTER (WHERE is_referred = true) > 0
      THEN ROUND(
        (
          COUNT(*) FILTER (
            WHERE is_referred = true
              AND is_converted = true
          )::numeric
          /
          NULLIF(COUNT(*) FILTER (WHERE is_referred = true), 0)
        ) * 100
      )
      ELSE 0
    END::int AS ref_conv_percent,

    CASE
      WHEN COUNT(*) FILTER (WHERE is_referred = false) > 0
      THEN ROUND(
        (
          COUNT(*) FILTER (
            WHERE is_referred = false
              AND is_converted = true
          )::numeric
          /
          NULLIF(COUNT(*) FILTER (WHERE is_referred = false), 0)
        ) * 100
      )
      ELSE 0
    END::int AS direct_conv_percent

  FROM base_users
),

referral_transactions AS (
  SELECT
    t.id,
    t.amount,
    t.created_at,
    t.method,
    t.payment_status,
    regexp_replace(t.transaction_id, '^.*_', '') AS txn_suffix,
    u.role
  FROM transactions t
  JOIN (
    SELECT DISTINCT
      transaction_id,
      wallet_id
    FROM transactions_to_wallet_lnk
  ) ttw
    ON ttw.transaction_id = t.id
  JOIN wallet_user_map wum
    ON wum.wallet_id = ttw.wallet_id
  JOIN public_users u
    ON u.id = wum.public_user_id
  WHERE t.method = 'Referral'
    AND t.payment_status = 'success'
),

expend_metrics AS (
  SELECT
    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Client'
        AND txn_suffix = 'referrer'
    ), 0)::float AS exp_ref_client,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Expert'
        AND txn_suffix = 'referrer'
    ), 0)::float AS exp_ref_expert,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Client'
        AND txn_suffix IN ('reciever', 'receiver')
    ), 0)::float AS exp_rec_client,

    COALESCE(SUM(amount) FILTER (
      WHERE role = 'Expert'
        AND txn_suffix IN ('reciever', 'receiver')
    ), 0)::float AS exp_rec_expert

  FROM referral_transactions
),

referral_graph AS (
  SELECT ARRAY_AGG(cnt ORDER BY month_start) AS ref_graph
  FROM (
    SELECT
      m.month_start,
      COUNT(bu.id)::int AS cnt
    FROM months_range m
    LEFT JOIN base_users bu
      ON date_trunc('month', bu.created_at)::date = m.month_start
     AND bu.is_referred = true
    GROUP BY m.month_start
  ) s
),

expense_graph AS (
  SELECT ARRAY_AGG(amount ORDER BY month_start) AS exp_graph
  FROM (
    SELECT
      m.month_start,
      COALESCE(SUM(rt.amount), 0)::float AS amount
    FROM months_range m
    LEFT JOIN referral_transactions rt
      ON date_trunc('month', rt.created_at)::date = m.month_start
    GROUP BY m.month_start
  ) s
),

meta_metrics AS (
  SELECT ARRAY_AGG(to_char(month_start, 'Mon') ORDER BY month_start) AS months
  FROM months_range
)

SELECT json_build_object(
  'data', json_build_object(
    'referrals', json_build_object(
      'total', um.ref_client + um.ref_expert,
      'client', um.ref_client,
      'expert', um.ref_expert,
      'graph', rg.ref_graph
    ),
    'platform_expends', json_build_object(
      'total',
        em.exp_ref_client
        + em.exp_ref_expert
        + em.exp_rec_client
        + em.exp_rec_expert,
      'referrer', json_build_object(
        'client', em.exp_ref_client,
        'expert', em.exp_ref_expert
      ),
      'reciever', json_build_object(
        'client', em.exp_rec_client,
        'expert', em.exp_rec_expert
      ),
      'graph', eg.exp_graph
    ),
    'referral_conversion', json_build_object(
      'total', um.ref_conv_client + um.ref_conv_expert,
      'client', um.ref_conv_client,
      'expert', um.ref_conv_expert,
      'percentage', um.ref_conv_percent
    ),
    'direct_conversion', json_build_object(
      'total', um.direct_conv_client + um.direct_conv_expert,
      'client', um.direct_conv_client,
      'expert', um.direct_conv_expert,
      'percentage', um.direct_conv_percent
    ),
    'meta', json_build_object(
      'months', mm.months
    )
  )
) AS result
FROM user_metrics um
CROSS JOIN expend_metrics em
CROSS JOIN referral_graph rg
CROSS JOIN expense_graph eg
CROSS JOIN meta_metrics mm;`);
      ctx.body = result.rows[0].result;
    } catch (err) {
      strapi2.log.error("Referral Stats SQL JSON Engine Error:", err.message);
      ctx.throw(500, err.message);
    }
  },
  async table_data(ctx) {
    try {
      const { page = 1, pageSize = 10, role = "all", search = "", sort = "id:desc" } = ctx.query;
      const start = (Number(page) - 1) * Number(pageSize);
      const limit = Number(pageSize);
      strapi2.log.info(`Referral Table Request (EntityService) - Role: ${role}, Search: "${search}", Sort: ${sort}`);
      const filters = {};
      if (role !== "all") {
        filters.role = { $eqi: role };
      }
      if (search) {
        filters.$or = [
          { name: { $containsi: search } },
          { email: { $containsi: search } },
          { mobile: { $containsi: search } }
        ];
      }
      let sortProp = sort;
      if (typeof sort === "string" && sort.includes(":")) {
        const [field, order] = sort.split(":");
        const normalizedOrder = (order || "desc").toLowerCase();
        if (field.startsWith("total_")) {
          sortProp = `user_statistic.${field}:${normalizedOrder}`;
        } else {
          sortProp = `${field}:${normalizedOrder}`;
        }
      }
      const rows = await strapi2.entityService.findMany("api::public-user.public-user", {
        filters,
        populate: { user_statistic: true, profilePic: true },
        start,
        limit,
        sort: sortProp
      });
      const total = await strapi2.entityService.count("api::public-user.public-user", { filters });
      ctx.body = {
        data: rows.map((u) => ({
          id: u.id,
          name: u.name || "Unknown",
          email: u.email || "N/A",
          mobile: u.mobile || "N/A",
          avatar: u.profilePic?.url || null,
          role: u.role || "Client",
          total_referrals: u.user_statistic?.total_referrals || 0,
          total_earnings_from_referrals: u.user_statistic?.total_earnings_from_referrals || 0,
          total_wallet_topup: u.user_statistic?.total_wallet_topup || 0
        })),
        meta: {
          pagination: {
            page: Number(page),
            pageSize: limit,
            total,
            pageCount: Math.ceil(total / limit)
          }
        }
      };
    } catch (err) {
      strapi2.log.error("table_data entityService error:", err.message);
      ctx.throw(500, err.message);
    }
  }
});
const statsController = ({ strapi: strapi2 }) => ({
  async getSummary(ctx) {
    try {
      const data = await strapi2.plugin("admin-pannel").service("stats").getSummaryStats();
      ctx.send(data);
    } catch (error) {
      strapi2.log.error("Stats Controller (Summary) Error:", error);
      ctx.internalServerError("Failed to fetch summary stats");
    }
  },
  async getGraph(ctx) {
    try {
      const { filter = "day wise" } = ctx.query;
      const data = await strapi2.plugin("admin-pannel").service("stats").getGraphStats(filter);
      ctx.send(data);
    } catch (error) {
      strapi2.log.error("Stats Controller (Graph) Error:", error);
      ctx.internalServerError("Failed to fetch graph stats");
    }
  }
});
const controllers = {
  calling,
  referral,
  stats: statsController
};
const middlewares = {};
const policies = {};
const callingRoutes = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/stream",
      handler: "calling.stream",
      config: { policies: [], auth: false }
    },
    {
      method: "GET",
      path: "/category-stats",
      handler: "calling.categoryStats",
      config: { policies: [] }
    },
    {
      method: "GET",
      path: "/recent-calls",
      handler: "calling.recentCalls",
      config: { policies: [], auth: false }
    },
    {
      method: "GET",
      path: "/stats",
      handler: "calling.getStats",
      config: { policies: [], auth: false }
    },
    {
      method: "POST",
      path: "/callend",
      handler: "calling.Callend",
      config: { policies: [] }
    },
    {
      method: "GET",
      path: "/stats/summary",
      handler: "stats.getSummary",
      config: { policies: [] }
    },
    {
      method: "GET",
      path: "/stats/graph",
      handler: "stats.getGraph",
      config: { policies: [] }
    }
  ]
};
const referralRoutes = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/referral-stats",
      handler: "referral.stats",
      config: { policies: [] }
    },
    {
      method: "GET",
      path: "/referral-table-data",
      handler: "referral.table_data",
      config: { policies: [] }
    }
  ]
};
const liveCallsService = ({ strapi: strapi2 }) => ({
  async callsData(res) {
    try {
      const stats = await strapi2.plugin("admin-pannel").service("dashboard").getDashboardStats({
        filters: { createdAt: { $gte: (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) } }
      });
      const calls = await strapi2.entityService.findMany("api::call.call", {
        filters: { $or: [{ callStatus: "ongoing" }, { callStatus: "pending" }] },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: "desc" }
      });
      const liveCalls = calls.map((call) => {
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
const dashboardService = ({ strapi: strapi2 }) => ({
  // ---------------------------------------------------------------------
  //  1. recent calls
  // ---------------------------------------------------------------------
  async getRecentCalls({ filters = {}, pagination = {} }) {
    try {
      const knex = strapi2.db.connection;
      let page = Math.max(1, Number(pagination.page) || 1);
      let pageSize = Math.min(50, Math.max(1, Number(pagination.pageSize) || 20));
      const offset = (page - 1) * pageSize;
      let startTimeGte = filters.createdAt?.$gte;
      let startTimeLte = filters.createdAt?.$lte;
      console.log("🔵 [getRecentCalls] Filters:", JSON.stringify(filters, null, 2));
      if (!startTimeGte && !startTimeLte) {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        startTimeGte = today.toISOString();
      }
      const statusFilter = filters.callStatus;
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
      const total = rows.length > 0 ? parseInt(rows[0].total_count) : 0;
      return {
        data: rows || [],
        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(total / pageSize),
            total
          }
        }
      };
    } catch (error) {
      strapi2.log.error("🔵 [DashboardService] getRecentCalls error:", error);
      return { data: [], meta: { pagination: { total: 0, pageCount: 0 } } };
    }
  },
  // ---------------------------------------------------------------------
  //  2. category stats
  // ---------------------------------------------------------------------
  async getCategoryStats({ filters = {} }) {
    try {
      const knex = strapi2.db.connection;
      let startTimeGte = filters.startTime?.$gte || filters.createdAt?.$gte;
      let startTimeLte = filters.startTime?.$lte || filters.createdAt?.$lte;
      console.log("🔵 [getCategoryStats] Filters:", JSON.stringify(filters, null, 2));
      if (!startTimeGte && !startTimeLte) {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        startTimeGte = today.toISOString();
      }
      const rows = await knex("calls as c").leftJoin("calls_categories_lnk as ccl", "c.id", "ccl.call_id").leftJoin("categories as cat", "ccl.category_id", "cat.id").leftJoin("calls_review_lnk as crl", "c.id", "crl.call_id").leftJoin("reviews as rev", "crl.review_id", "rev.id").select(knex.raw(`COALESCE(TRIM(cat.name), 'Others') as "name"`)).select(knex.raw(`SUM(CASE WHEN c.type = 'videoCall' THEN 1 ELSE 0 END) as "videoCalls"`)).select(knex.raw(`SUM(CASE WHEN c.type <> 'videoCall' THEN 1 ELSE 0 END) as "calls"`)).select(knex.raw(`SUM(COALESCE(c.duration, 0)) as "minutes"`)).select(knex.raw(`ROUND(AVG(CASE WHEN rev.rating IS NOT NULL THEN rev.rating ELSE 0 END), 1) as "avgRating"`)).where((qb) => {
        qb.whereNotIn("c.call_status", ["pending", "ongoing"]);
        if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
        if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
      }).groupByRaw(`COALESCE(TRIM(cat.name), 'Others')`).orderByRaw(`COUNT(*) DESC`);
      return rows || [];
    } catch (error) {
      strapi2.log.error("🔵 [DashboardService] getCategoryStats error:", error);
      return [];
    }
  },
  // ---------------------------------------------------------------------
  //  3. stats
  // ---------------------------------------------------------------------
  async getDashboardStats({ filters = {} }) {
    try {
      const knex = strapi2.db.connection;
      let startTimeGte = filters.createdAt?.$gte;
      let startTimeLte = filters.createdAt?.$lte;
      if (!startTimeGte && !startTimeLte) {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        startTimeGte = today.toISOString();
      }
      if (!startTimeGte) {
        const today = /* @__PURE__ */ new Date();
        today.setHours(0, 0, 0, 0);
        startTimeGte = today.toISOString();
      }
      const totalExperts = await strapi2.documents("api::expert-profile.expert-profile").count();
      const expertsOnline = await strapi2.documents("api::expert-profile.expert-profile").count({ filters: { isActive: true } });
      const rows = await knex("calls as c").select("c.type").select(knex.raw('COUNT(*)::int AS "callsToday"')).select(knex.raw(`COUNT(*) FILTER (WHERE c.call_status IN ('ongoing', 'pending'))::int AS "liveCalls"`)).select(knex.raw(`COUNT(*) FILTER (WHERE c.call_status = 'completed')::int AS "completedCalls"`)).select(knex.raw(`COUNT(*) FILTER (WHERE c.call_status = 'declined')::int AS "declinedCalls"`)).select(knex.raw(`COUNT(*) FILTER (WHERE c.call_status = 'missed')::int AS "missedCalls"`)).select(knex.raw(`COALESCE(SUM(c.duration) FILTER (WHERE c.call_status = 'completed'), 0)::int AS "avgDuration"`)).where((qb) => {
        if (startTimeGte) qb.where("c.created_at", ">=", startTimeGte);
        if (startTimeLte) qb.where("c.created_at", "<=", startTimeLte);
      }).groupBy("c.type").orderBy("c.type");
      const voice = rows.find((r) => r.type === "voiceCall") || {};
      const video = rows.find((r) => r.type === "videoCall") || {};
      const stats = { voice, video, expertsOnline, totalExperts };
      return stats;
    } catch (error) {
      strapi2.log.error("🔵 [DashboardService] getDashboardStats error:", error);
      return {
        voice: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
        video: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
        expertsOnline: 0
      };
    }
  },
  // ---------------------------------------------------------------------
  //  4. live calls table
  // ---------------------------------------------------------------------
  async getLiveCalls() {
    try {
      const liveCallsRaw = await strapi2.entityService.findMany("api::call.call", {
        filters: { callStatus: { $in: ["ongoing", "pending"] } },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: "desc" }
      });
      return (liveCallsRaw || []).map((call) => ({
        id: call.id,
        documentId: call.documentId,
        caller: call.caller?.name,
        expert: call.receiver?.name,
        type: call.type,
        startTime: call.startTime,
        status: call.callStatus,
        duration: call.duration,
        category: call.categories?.[0]?.name
      }));
    } catch (error) {
      strapi2.log.error("🔵 [DashboardService] getLiveCalls error:", error);
      return [];
    }
  },
  // ---------------------------------------------------------------------
  //  BROADCAST
  // ---------------------------------------------------------------------
  async broadcast() {
    try {
      const stats = await this.getDashboardStats({});
      const recentCallsResult = await this.getRecentCalls({ pagination: { pageSize: 20 } });
      const recentCalls = recentCallsResult.data || [];
      const categoryStats = await this.getCategoryStats({});
      const liveCalls = await this.getLiveCalls();
      const sse = strapi2.plugin("admin-pannel").service("sse");
      sse.broadcast({ stats });
      sse.broadcast({ liveCalls });
      sse.broadcast({ recentCalls });
      sse.broadcast({ categoryStats });
      strapi2.log.info("📡 [DashboardService] Broadcasted dashboard update.");
    } catch (error) {
      strapi2.log.error("📡 [DashboardService] Broadcast error:", error);
    }
  }
});
const statsService = ({ strapi: strapi2 }) => ({
  async getTestUserIds() {
    const appConfig = await strapi2.db.query("api::app-config.app-config").findOne({
      populate: ["test_accounts"]
    });
    return appConfig?.test_accounts?.map((u) => u.documentId).filter(Boolean) || [];
  },
  async getPendingExpertStats() {
    const [tVer, tApp] = await Promise.all([
      strapi2.documents("api::expert-verification.expert-verification").count({ filters: { is_form_submitted: true } }),
      strapi2.documents("api::expert-profile-approval.expert-profile-approval").count({ filters: { is_approved: false } })
    ]);
    return { pendingVerifications: tVer, pendingApprovals: tApp };
  },
  async getPlatformEarnings(range = {}) {
    try {
      let dateFilter = "";
      const params = [];
      if (range.createdAt) {
        if (range.createdAt.$gte) {
          dateFilter += ` AND t.created_at >= ?`;
          params.push(range.createdAt.$gte);
        }
        if (range.createdAt.$lte) {
          dateFilter += ` AND t.created_at <= ?`;
          params.push(range.createdAt.$lte);
        }
      }
      const allParams = [...params, ...params];
      let sql = `
        SELECT COALESCE(SUM(net_earning), 0) as total
        FROM (
          SELECT 
            call_id, 
            SUM(in_amt) - SUM(out_amt) as net_earning
          FROM (
            -- 1. incoming_transactions
            SELECT tcl.call_id, t.amount as in_amt, 0 as out_amt
            FROM wallets w
            JOIN transactions_to_wallet_lnk twl ON w.id = twl.wallet_id
            JOIN transactions t ON twl.transaction_id = t.id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}

            UNION ALL

            -- 2. outgoing_transactions
            SELECT tcl.call_id, 0 as in_amt, t.amount as out_amt
            FROM wallets w
            JOIN transactions_from_wallet_lnk fwl ON w.id = fwl.wallet_id
            JOIN transactions t ON fwl.transaction_id = t.id
            JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
            WHERE w.wallet_type = 'EARNINGS_WALLET'
            AND t.payment_status = 'success'
            ${dateFilter}
          ) AS combined
          GROUP BY call_id
        ) AS final
      `;
      const result = await strapi2.db.connection.raw(sql, allParams);
      const total = result.rows?.[0]?.total || 0;
      return Number(total);
    } catch (error) {
      strapi2.log.error("Platform Earnings Array SQL Error:", error);
      return 0;
    }
  },
  async getPlatformReportStats({ startDate, endDate } = {}) {
    try {
      const ids = await this.getTestUserIds();
      const range = startDate || endDate ? {
        createdAt: { ...startDate && { $gte: startDate }, ...endDate && { $lte: endDate } }
      } : {};
      const upRange = range.createdAt ? { updatedAt: range.createdAt } : {};
      const [
        tVer,
        nVer,
        tApp,
        nApp,
        tClients,
        nClients,
        tExperts,
        nExperts,
        tBlocked,
        nBlocked,
        tDeleted,
        nDeleted,
        tTopups,
        nTopups,
        tRefs,
        nRefs
        // tEarnings, nEarnings
      ] = await Promise.all([
        strapi2.documents("api::expert-verification.expert-verification").count({ filters: { is_form_submitted: true } }),
        strapi2.documents("api::expert-verification.expert-verification").count({ filters: { is_form_submitted: true, ...range } }),
        strapi2.documents("api::expert-profile-approval.expert-profile-approval").count({ filters: { is_approved: false } }),
        strapi2.documents("api::expert-profile-approval.expert-profile-approval").count({ filters: { is_approved: false, ...range } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { role: "Client", documentId: { $notIn: ids } } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { role: "Client", documentId: { $notIn: ids }, ...range } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { role: "Expert", documentId: { $notIn: ids } } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { role: "Expert", documentId: { $notIn: ids }, ...range } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { accountStatus: "blocked", documentId: { $notIn: ids } } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { accountStatus: "blocked", documentId: { $notIn: ids }, ...upRange } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { accountStatus: "deleted", documentId: { $notIn: ids } } }),
        strapi2.documents("api::public-user.public-user").count({ filters: { accountStatus: "deleted", documentId: { $notIn: ids }, ...upRange } }),
        strapi2.documents("api::transaction.transaction").findMany({ filters: { transactionType: "topup", paymentStatus: "success" }, fields: ["amount", "metadata"], pagination: { limit: -1 } }),
        strapi2.documents("api::transaction.transaction").findMany({ filters: { transactionType: "topup", paymentStatus: "success", ...range }, fields: ["amount", "metadata"], pagination: { limit: -1 } }),
        strapi2.documents("api::transaction.transaction").findMany({ filters: { method: "Referral", paymentStatus: "success" }, fields: ["amount"], pagination: { limit: -1 } }),
        strapi2.documents("api::transaction.transaction").findMany({ filters: { method: "Referral", paymentStatus: "success", ...range }, fields: ["amount"], pagination: { limit: -1 } })
        // this.getPlatformEarnings(),
        // this.getPlatformEarnings(range)
      ]);
      const sumProd = (list) => list.reduce((s, t) => t.metadata?.appliedPayUConfig?.mode === "production" ? s + (Number(t.amount) || 0) : s, 0);
      const sumAll = (list) => list.reduce((s, r) => s + (Number(r.amount) || 0), 0);
      return {
        pendingVerifications: { total: tVer, range: nVer },
        pendingApprovals: { total: tApp, range: nApp },
        clients: { total: tClients, range: nClients },
        experts: { total: tExperts, range: nExperts },
        blockedUsers: { total: tBlocked, range: nBlocked },
        deletedUsers: { total: tDeleted, range: nDeleted },
        topups: { total: sumProd(tTopups), range: sumProd(nTopups) },
        referrals: { total: sumAll(tRefs), range: sumAll(nRefs) }
        // platformEarnings: { total: tEarnings, range: nEarnings }
      };
    } catch (e) {
      strapi2.log.error("Platform Report Error:", e);
      throw e;
    }
  },
  async getSummaryStats() {
    try {
      const testIds = await this.getTestUserIds();
      const totalUsers = await strapi2.documents("api::public-user.public-user").count({
        filters: {
          documentId: { $notIn: testIds },
          accountStatus: "active"
        }
      });
      const [activeClients, blockedClients, deletedClients] = await Promise.all([
        strapi2.documents("api::public-user.public-user").count({
          filters: { role: "Client", documentId: { $notIn: testIds }, accountStatus: "active" }
        }),
        strapi2.documents("api::public-user.public-user").count({
          filters: { role: "Client", documentId: { $notIn: testIds }, accountStatus: "blocked" }
        }),
        strapi2.documents("api::public-user.public-user").count({
          filters: { role: "Client", documentId: { $notIn: testIds }, accountStatus: "deleted" }
        })
      ]);
      const clients = activeClients;
      const clientsByStatus = {
        Active: activeClients,
        Blocked: blockedClients,
        Deleted: deletedClients
      };
      const platformEarnings = await this.getPlatformEarnings();
      const allExperts = await strapi2.documents("api::public-user.public-user").findMany({
        filters: {
          role: "Expert",
          documentId: { $notIn: testIds }
        },
        populate: { expert: { fields: ["user_status", "isApproved"] } },
        pagination: { limit: -1 }
      });
      const availability = { Online: 0, Offline: 0, Busy: 0 };
      const expertsByStatus = { Approved: 0, Pending: 0, Blocked: 0, Deleted: 0 };
      allExperts.forEach((user) => {
        const accStatus = user.accountStatus;
        if (accStatus === "active") {
          const status = user.expert?.user_status || "offline";
          const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
          if (availability.hasOwnProperty(formattedStatus)) {
            availability[formattedStatus]++;
          }
          if (user.expert?.isApproved) {
            expertsByStatus.Approved++;
          } else {
            expertsByStatus.Pending++;
          }
        } else if (accStatus === "blocked") {
          expertsByStatus.Blocked++;
        } else if (accStatus === "deleted") {
          expertsByStatus.Deleted++;
        }
      });
      const experts = expertsByStatus.Approved + expertsByStatus.Pending;
      const verifiedVerifications = await strapi2.documents("api::expert-verification.expert-verification").findMany({
        filters: {
          Verified_Badge: true,
          expert_profile: {
            user: {
              documentId: { $notIn: testIds },
              accountStatus: "active"
            }
          }
        },
        pagination: { limit: -1 }
      });
      const badges = {
        "Identity Badge": 0,
        "Address Badge": 0,
        "Education Badge": 0,
        "LinkedIn Badge": 0,
        "GST Badge": 0,
        "Bank Badge": 0
      };
      verifiedVerifications.forEach((v) => {
        if (v.Identity_Verified) badges["Identity Badge"]++;
        if (v.Address_Verified) badges["Address Badge"]++;
        if (v.Education_Verified) badges["Education Badge"]++;
        if (v.LinkedIn_Verified) badges["LinkedIn Badge"]++;
        if (v.GST_Verified) badges["GST Badge"]++;
        if (v.Bank_Verified) badges["Bank Badge"]++;
      });
      const { pendingVerifications, pendingApprovals } = await this.getPendingExpertStats();
      const allTopups = await strapi2.documents("api::transaction.transaction").findMany({
        filters: {
          transactionType: "topup",
          paymentStatus: "success"
        },
        fields: ["amount", "metadata"],
        pagination: { limit: -1 }
      });
      const totalTopups = allTopups.reduce((sum, t) => {
        if (t.metadata?.appliedPayUConfig?.mode === "production") {
          return sum + (Number(t.amount) || 0);
        }
        return sum;
      }, 0);
      const referralTransactions = await strapi2.documents("api::transaction.transaction").findMany({
        filters: {
          method: "Referral",
          paymentStatus: "success"
        },
        fields: ["amount"],
        pagination: { limit: -1 }
      });
      const referralExpenses = referralTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
      const wallet = {
        totalTopups,
        platformEarnings,
        referralDistributed: referralExpenses,
        economy: {
          audio: { clientSpent: 0, expertEarned: 0, commission: 0 },
          video: { clientSpent: 0, expertEarned: 0, commission: 0 }
        }
      };
      return {
        total: totalUsers,
        test: testIds?.length || 0,
        clients,
        clientsByStatus,
        experts,
        expertsByStatus,
        pendingApprovals,
        pendingVerifications,
        availability,
        badges,
        wallet
      };
    } catch (error) {
      strapi2.log.error("Stats Service Error (Summary):", error);
      throw error;
    }
  },
  /**
   * Fetches time-series data for graphs based on interval.
   */
  async getGraphStats(interval = "day wise") {
    try {
      const testIds = await this.getTestUserIds();
      const startDate = /* @__PURE__ */ new Date();
      if (interval === "day wise") startDate.setDate(startDate.getDate() - 30);
      else if (interval === "monthly") startDate.setMonth(startDate.getMonth() - 12);
      else startDate.setFullYear(startDate.getFullYear() - 12);
      const [totalUsers, clients, experts, testUsersRaw, transactions] = await Promise.all([
        // Total Users (Real, All)
        strapi2.documents("api::public-user.public-user").findMany({
          filters: {
            documentId: { $notIn: testIds },
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ["createdAt", "accountStatus"],
          pagination: { limit: -1 }
        }),
        // Clients (Real, All)
        strapi2.documents("api::public-user.public-user").findMany({
          filters: {
            documentId: { $notIn: testIds },
            role: "Client",
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ["createdAt", "accountStatus"],
          pagination: { limit: -1 }
        }),
        // Experts (Real, All)
        strapi2.documents("api::public-user.public-user").findMany({
          filters: {
            documentId: { $notIn: testIds },
            role: "Expert",
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ["createdAt", "accountStatus"],
          pagination: { limit: -1 }
        }),
        // Test Users
        strapi2.documents("api::public-user.public-user").findMany({
          filters: {
            documentId: { $in: testIds },
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ["createdAt"],
          pagination: { limit: -1 }
        }),
        // Successful Transactions
        strapi2.documents("api::transaction.transaction").findMany({
          filters: {
            paymentStatus: "success",
            createdAt: { $gte: startDate.toISOString() }
          },
          fields: ["amount", "method", "metadata", "createdAt", "transactionType"],
          pagination: { limit: -1 }
        })
      ]);
      let format = "YYYY-MM-DD";
      if (interval === "monthly") format = "YYYY-MM";
      else if (interval === "yearly") format = "YYYY";
      const earningsSql = `
        SELECT bucket, SUM(in_amt) - SUM(out_amt) as earnings
        FROM (
          -- Incoming
          SELECT TRIM(TO_CHAR(t.created_at, ?)) as bucket, t.amount as in_amt, 0 as out_amt
          FROM wallets w
          JOIN transactions_to_wallet_lnk twl ON w.id = twl.wallet_id
          JOIN transactions t ON twl.transaction_id = t.id
          JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
          WHERE w.wallet_type = 'EARNINGS_WALLET'
          AND t.payment_status = 'success'
          AND t.created_at >= ?

          UNION ALL

          -- Outgoing
          SELECT TRIM(TO_CHAR(t.created_at, ?)) as bucket, 0 as in_amt, t.amount as out_amt
          FROM wallets w
          JOIN transactions_from_wallet_lnk fwl ON w.id = fwl.wallet_id
          JOIN transactions t ON fwl.transaction_id = t.id
          JOIN transactions_call_lnk tcl ON t.id = tcl.transaction_id
          WHERE w.wallet_type = 'EARNINGS_WALLET'
          AND t.payment_status = 'success'
          AND t.created_at >= ?
        ) AS combined
        GROUP BY bucket
      `;
      const earningsResult = await strapi2.db.connection.raw(earningsSql, [
        format,
        startDate.toISOString(),
        format,
        startDate.toISOString()
      ]);
      const earningsRows = earningsResult.rows;
      const earningsBuckets = {};
      earningsRows?.forEach((row) => {
        earningsBuckets[row.bucket] = Number(row.earnings) || 0;
      });
      const getBucket = (dateStr) => {
        const d = new Date(dateStr);
        if (interval === "day wise") return d.toISOString().split("T")[0];
        if (interval === "monthly") return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        return `${d.getFullYear()}`;
      };
      const aggregate = (list, filterFn = null, amountField = null) => {
        const buckets = {};
        list.forEach((item) => {
          if (filterFn && !filterFn(item)) return;
          const key = getBucket(item.createdAt);
          const val = amountField ? Number(item[amountField]) || 0 : 1;
          buckets[key] = (buckets[key] || 0) + val;
        });
        return buckets;
      };
      const clientsBucketsAll = aggregate(clients);
      const expertsBucketsAll = aggregate(experts);
      const totalBucketsActive = aggregate(totalUsers, (u) => u.accountStatus === "active");
      const clientsBucketsActive = aggregate(clients, (u) => u.accountStatus === "active");
      const expertsBucketsActive = aggregate(experts, (u) => u.accountStatus === "active");
      const testBuckets = aggregate(testUsersRaw);
      const topupsBuckets = aggregate(
        transactions,
        (t) => t.metadata?.transactionType === "topup" && t.metadata?.appliedPayUConfig?.mode === "production",
        "amount"
      );
      const referralsBuckets = aggregate(transactions, (t) => t.method === "Referral", "amount");
      const periods = [];
      const now = /* @__PURE__ */ new Date();
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now);
        if (interval === "day wise") d.setDate(d.getDate() - i);
        else if (interval === "monthly") d.setMonth(d.getMonth() - i);
        else d.setFullYear(d.getFullYear() - i);
        const key = getBucket(d.toISOString());
        periods.push(key);
      }
      const mapToValues = (buckets) => periods.map((p) => buckets[p] || 0);
      const labels = periods.map((p) => {
        const d = /* @__PURE__ */ new Date(p + (interval === "monthly" ? "-01" : ""));
        if (interval === "day wise") return `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
        if (interval === "monthly") return `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
        return d.getFullYear().toString();
      });
      return {
        meta: { labels },
        growth: {
          experts: mapToValues(expertsBucketsAll),
          clients: mapToValues(clientsBucketsAll)
        },
        wallet: {
          trend: mapToValues(topupsBuckets)
        },
        sparklines: {
          total: mapToValues(totalBucketsActive),
          users: mapToValues(clientsBucketsActive),
          experts: mapToValues(expertsBucketsActive),
          test: mapToValues(testBuckets),
          topups: mapToValues(topupsBuckets),
          referrals: mapToValues(referralsBuckets),
          earnings: mapToValues(earningsBuckets)
        }
      };
    } catch (error) {
      strapi2.log.error("Stats Service Error (Graph):", error);
      throw error;
    }
  }
});
const services = {
  liveCallsService,
  sse: sseService,
  dashboard: dashboardService,
  stats: statsService
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
  routes: {
    calling: callingRoutes,
    referral: referralRoutes
  },
  services
};
module.exports = index;
