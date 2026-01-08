const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
  strapi.documents.use(async (context, next) => {
    const result = await next();
    if ((context.uid === "api::call.call" || context.uid === "api::expert-profile.expert-profile") && (context.action === "create" || context.action === "update")) {
      try {
        await strapi.plugin("admin-pannel").service("liveCallsService").callsData();
      } catch (error) {
        strapi.log.error("Error in liveCallsService middleware:", error);
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
const DEFAULT_LOGO_URL = "https://callingappdev.s3.ap-south-1.amazonaws.com/avatars/CE_Logo_Icon_e8fa8dff79.png";
const LIST_DELIMITER_REGEX = /[\n,]/;
const toAbsoluteUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const baseUrl = process.env.STRAPI_ADMIN_BACKEND_URL || process.env.STRAPI_BACKEND_URL || process.env.STRAPI_URL || "";
  if (!baseUrl) return url;
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const normalizedPath = String(url).replace(/^\//, "");
  return `${normalizedBase}/${normalizedPath}`;
};
const normalizeBlocksField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (value?.document && Array.isArray(value.document)) return value.document;
  return [];
};
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
const buildFallback = (overrides = {}) => ({
  name: process.env.PLATFORM_NAME || "Consultease",
  supportEmail: process.env.PLATFORM_SUPPORT_EMAIL || "support@consultease.com",
  logo: DEFAULT_LOGO_URL,
  companyProfile: null,
  monthlyStatementBottomContent: [],
  ...overrides
});
const resolveMediaUrl = (media) => {
  const entry = extractMediaEntry(media);
  if (!entry) {
    return null;
  }
  const url = entry.url || entry.formats?.large?.url || entry.formats?.medium?.url || entry.formats?.small?.url || entry.formats?.thumbnail?.url || null;
  return toAbsoluteUrl(url);
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
async function loadPlatformInfo(strapi, options = {}) {
  if (!strapi) {
    throw new Error("A Strapi instance is required to load platform info");
  }
  const fallback = buildFallback(options.fallback);
  const logger = options.logger || strapi.log;
  const model = typeof strapi.contentType === "function" && strapi.contentType("api::app-config.app-config") || typeof strapi.getModel === "function" && strapi.getModel("api::app-config.app-config") || {};
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
          wallet: true,
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
    const config2 = await strapi.documents("api::app-config.app-config").findFirst({
      status: "published",
      populate
    });
    if (!config2) {
      return fallback;
    }
    let companyProfile = {
      name: config2.company_profile?.name || fallback.name,
      supportEmail: config2.supportEmail || "abc@xyz.com",
      logo: resolveMediaUrl(config2.logo) || fallback.logo,
      companyProfile: config2.company_profile,
      monthlyStatementBottomContent: normalizeBlocksField(
        bottomContentField && config2[bottomContentField] || config2.monthly_statement_bottom_content || config2.monthly_statment_bottom_content
      ),
      wallet: config2.company_profile?.wallet || null,
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
const dashboard = ({ strapi }) => ({
  async stream(ctx) {
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.status = 200;
    await strapi.plugin("admin-pannel").service("liveCallsService").callsData(ctx.res);
    const hb = setInterval(() => {
      try {
        ctx.res.write(`: ping ${Date.now()}

`);
      } catch {
      }
    }, 15e3);
    ctx.req.on("close", () => {
      clearInterval(hb);
      strapi.plugin("admin-pannel").service("sse").removeClient(ctx.res);
    });
    ctx.respond = false;
  },
  // ----------------------------------------------------------
  // GET /api/call/recent-calls 
  // ----------------------------------------------------------
  async recentCalls(ctx) {
    try {
      let pagination = {};
      let page = 1;
      let pageSize = null;
      const baseFilters = { callStatus: { $notIn: ["pending", "ongoing"] } };
      const clientFilters = ctx.query?.filters || {};
      const filters = { ...baseFilters, ...clientFilters };
      const total = await strapi.entityService.count("api::call.call", { filters });
      if (ctx.query?.pagination?.pageSize) {
        page = Math.max(1, Number(ctx.query?.pagination?.page) || 1);
        pageSize = Math.min(50, Math.max(1, Number(ctx.query?.pagination?.pageSize)));
        pagination = {
          start: (page - 1) * pageSize,
          limit: pageSize
        };
      }
      const calls = await strapi.entityService.findMany("api::call.call", {
        filters,
        ...pagination,
        populate: {
          caller: true,
          receiver: { populate: { expert: true } },
          categories: true,
          review: { fields: ["rating"] }
        },
        sort: { createdAt: "desc" }
      });
      const recentCalls = calls.map((call) => ({
        id: call.id,
        type: call.type,
        documentId: call.documentId,
        time: call.startTime,
        duration: call.duration,
        caller: call.caller?.name,
        expert: call.receiver?.name,
        category: call.categories?.[0]?.name,
        rating: call.review?.rating,
        revenue: call.totalCost || 0,
        status: call.callStatus
      }));
      return ctx.send({
        data: recentCalls,
        meta: pageSize ? {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(total / pageSize),
            total
          }
        } : { pagination: { total } }
      });
    } catch (error) {
      strapi.log.error("recentCalls error", error);
      return ctx.internalServerError(
        error.message || "recentCalls failed"
      );
    }
  },
  // ----------------------------------------------------------
  // GET /api/category-stats
  // ----------------------------------------------------------
  async categoryStats(ctx) {
    try {
      const clientFilters = ctx.query?.filters || {};
      const filters = { ...clientFilters };
      const calls = await strapi.entityService.findMany("api::call.call", {
        filters,
        fields: ["duration", "totalCost", "type"],
        populate: {
          categories: { fields: ["name"] },
          review: { fields: ["rating"] }
        }
      });
      const map = /* @__PURE__ */ new Map();
      for (const row of calls) {
        const categoryName = row.categories?.[0]?.name?.trim() || "Others";
        const minutes = Number(row.duration || 0);
        const rating = Number(row.review?.rating);
        const hasRating = Number.isFinite(rating);
        const type = row.type;
        if (!map.has(categoryName)) {
          map.set(categoryName, {
            name: categoryName,
            calls: 0,
            videoCalls: 0,
            minutes: 0,
            // revenue: 0,
            _ratingSum: 0,
            _ratingCount: 0
          });
        }
        const agg = map.get(categoryName);
        if (type === "videoCall") agg.videoCalls += 1;
        else agg.calls += 1;
        agg.minutes += minutes;
        if (hasRating) {
          agg._ratingSum += rating;
          agg._ratingCount += 1;
        }
      }
      const results = Array.from(map.values()).map((x) => ({
        name: x.name,
        calls: x.calls,
        videoCalls: x.videoCalls,
        totalCalls: x.calls + x.videoCalls,
        minutes: Math.ceil(x.minutes),
        // revenue: x.revenue,
        avgRating: x._ratingCount ? Number((x._ratingSum / x._ratingCount).toFixed(1)) : 0
      })).sort((a, b) => b.totalCalls - a.totalCalls);
      return ctx.send(results);
    } catch (error) {
      strapi.log.error("categoryStats error", error);
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
      const platformInfo = await loadPlatformInfo(strapi, { logger: strapi.log });
      if (platformInfo.is_live === false) {
        console.warn("🔔 [Callend] Platform maintenance mode");
        return ctx.badRequest("Platform is under maintenance");
      }
      const existingCall = await strapi.entityService.findOne(
        "api::call.call",
        callId,
        {
          populate: {
            caller: { populate: ["wallet"] },
            receiver: { populate: ["wallet", "expert", "expert.rates"] }
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
          callStatus: "declined",
          callerId: existingCall.caller.id,
          receiverId: existingCall.receiver.id,
          callerName: existingCall.caller.name,
          receiverName: existingCall.receiver.name,
          callType: existingCall.type,
          callId: existingCall.id
        };
        const declinedCall = await strapi.entityService.update(
          "api::call.call",
          callId,
          {
            data: {
              callStatus: "declined",
              endTime: endTime || /* @__PURE__ */ new Date(),
              duration: 0,
              totalCost: 0,
              duration_sec: 0,
              metadata: declinedMetadata
            },
            populate: {
              caller: { populate: ["wallet"] },
              receiver: { populate: ["wallet"] }
            }
          }
        );
        try {
          const callerUser = await strapi.entityService.findOne("api::public-user.public-user", existingCall.caller.id, { fields: ["firebaseTokens"] });
          const receiverUser = await strapi.entityService.findOne("api::public-user.public-user", existingCall.receiver.id, { fields: ["firebaseTokens"] });
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
        strapi.entityService.findMany("api::pricing-config.pricing-config", { limit: 1 })
      ]);
      const settings = Array.isArray(pricingRaw) ? pricingRaw[0] : pricingRaw;
      if (!settings) {
        console.warn("🔔 [Callend] Pricing config missing");
        return ctx.badRequest("Pricing config not found.");
      }
      const companyProfile = resolvePopulatedEntry(platformInfo?.companyProfile);
      const adminWallet = resolvePopulatedEntry(companyProfile?.wallet);
      if (!adminWallet?.id) {
        console.warn("🔔 [Callend] Admin wallet missing", { companyProfileId: companyProfile?.id, adminWalletId: adminWallet?.id });
        return ctx.badRequest("Admin wallet not found.");
      }
      const caller = existingCall.caller;
      const receiver = existingCall.receiver;
      const callerWallet = caller.wallet;
      let receiverWallet = receiver.wallet;
      if (!callerWallet) {
        console.warn("🔔 [Callend] Caller wallet missing", caller.id);
        return ctx.badRequest("Caller wallet not found.");
      }
      if (!receiverWallet) {
        receiverWallet = await strapi.entityService.create(
          "api::wallet.wallet",
          {
            data: { balance: 0, user: receiver.id, transactions: [] }
          }
        );
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
      const updatedCall = await strapi.entityService.update(
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
            caller: { populate: ["wallet"] },
            receiver: { populate: ["wallet"] }
          }
        }
      );
      if (minutes <= 0 || totalCost <= 0) {
        try {
          const callerUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
          const receiverUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
          const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
          if (tokens.length) {
            await sendToTokens(tokens, {
              data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
              android: { priority: "high" }
            });
          }
        } catch (e) {
          strapi.log.warn("CALL_ENDED push skipped:", e?.message || e);
        }
        return ctx.send({
          success: true,
          call: updatedCall,
          message: "Call ended (no billing)."
        });
      }
      const transactionId = `TXN-${Date.now()}`;
      const callChargeTxn = await strapi.entityService.create(
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
      const expertPayoutTxn = await strapi.entityService.create(
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
            await strapi.documents("api::expert-profile.expert-profile").update({
              documentId: receiver.expert.documentId,
              data: { user_status: "online" }
            });
            strapi.log.info(
              `✅ Set Expert ${receiver.id} status to 'online' (Call Ended)`
            );
          } catch (statusErr) {
            strapi.log.error(
              `Failed to set Expert ${receiver.id} status to 'online' (Call Ended):`,
              statusErr
            );
          }
        }
        const expertId = receiver?.expert?.id;
        if (expertId) {
          await strapi.service("api::call.call").incrementExpertDurations({
            expertId,
            minutes: Number(durationMin || 0)
          });
        }
      } catch (e) {
        strapi.log.warn("incrementExpertDurations failed:", e?.message || e);
      }
      try {
        const callerUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
        const receiverUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
        const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
        if (tokens.length) {
          await sendToTokens(tokens, {
            data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
            android: { priority: "high" }
          });
        }
      } catch (e) {
        strapi.log.warn("CALL_ENDED push skipped:", e?.message || e);
      }
      return ctx.send({
        success: true,
        call: updatedCall,
        transactions: [callChargeTxn, expertPayoutTxn],
        message: "Call ended and billed successfully."
      });
    } catch (error) {
      strapi.log.error("Callend Error:", error);
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
const liveCallsService = ({ strapi }) => ({
  async callsData(res) {
    try {
      const date = /* @__PURE__ */ new Date();
      const today = date.setHours(0, 0, 0, 0);
      const calls = await strapi.entityService.findMany("api::call.call", {
        filters: { createdAt: { $gte: today } },
        populate: { caller: true, receiver: true, categories: true },
        sort: { createdAt: "desc" }
      });
      const reviews = await strapi.entityService.findMany("api::review.review", { fields: ["rating"] });
      const experts = await strapi.entityService.findMany("api::expert-profile.expert-profile");
      const stats = {
        liveCalls: calls.filter((call) => call.callStatus === "ongoing").length,
        voiceCalls: calls.filter((call) => call.type === "voiceCall").length,
        videoCalls: calls.filter((call) => call.type === "videoCall").length,
        expertsOnline: experts.filter((expert) => expert.isActive).length,
        totalExperts: experts.length,
        callsToday: calls.length,
        declinedCalls: calls.filter((call) => call.callStatus === "declined").length,
        completedCalls: calls.filter((call) => call.callStatus === "completed").length,
        avgDuration: calls.reduce((total, call) => total + call.duration, 0),
        avgCallRevenue: Math.round(calls.reduce((total, call) => total + call.totalCost, 0)),
        avgRating: (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length)?.toFixed(1)
      };
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
        strapi.plugin("admin-pannel").service("sse").addClient(res);
      } else {
        strapi.plugin("admin-pannel").service("sse").broadcast({ stats, liveCalls });
      }
    } catch (error) {
      strapi.log.error("dashboardData error", error);
      return { error: error || "dashboardData failed" };
    }
  }
});
const sseService = ({ strapi }) => {
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
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
