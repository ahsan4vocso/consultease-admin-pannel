const LIST_DELIMITER_REGEX = /[\n,]/;


const sanitizeDataPayload = (data) => {
  if (!data || typeof data !== "object") return undefined;
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value : typeof value === "object" ? JSON.stringify(value) : String(value),
      ])
  );
};

const tryParseJson = (value) => {
  try { return JSON.parse(value); } catch { return null; }
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
    if (parsed !== null && parsed !== undefined) {
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

const INVALID_FCM_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

const isInvalidFirebaseTokenError = (error) => {
  if (!error) return false;
  const code = error.code || error.errorInfo?.code;
  if (code && INVALID_FCM_CODES.has(code)) return true;
  const message = error.message || error.errorInfo?.message;
  return typeof message === "string" && message.toLowerCase().includes("requested entity was not found");
};


async function sendToTokens(
  tokens,
  { notification, data, android, apns, ttlSeconds = 300 }
) {
  const safeData = sanitizeDataPayload(data);
  const clean = uniqueTokens(normalizeFirebaseTokens(tokens));
  if (clean.length === 0) {
    return { successCount: 0, failureCount: 0, invalidTokens: [] };
  }

  const androidConfig = {
    priority: "high",
    ttl: ttlSeconds * 1000,
    collapseKey: safeData?.type || "default",
    ...android,
  };

  const apnsConfig = {
    headers: { "apns-priority": "10" },
    ...apns,
  };

  if (clean.length === 1) {
    try {
      await admin.messaging().send({
        token: clean[0],
        notification,
        data: safeData,
        android: androidConfig,
        apns: apnsConfig,
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
    apns: apnsConfig,
  });
  const invalidTokens = [];
  if (Array.isArray(res?.responses)) {
    res.responses.forEach((response, index) => {
      if (!response.success && isInvalidFirebaseTokenError(response.error)) {
        invalidTokens.push(clean[index]);
      }
    });
  }
  return {
    successCount: res.successCount ?? 0,
    failureCount: res.failureCount ?? 0,
    invalidTokens,
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
  if (value === null || value === undefined) return [];
  const initial = Array.isArray(value) ? value.flat(Infinity) : [value];
  const tokens = [];
  const emitToken = (token) => {
    if (token === null || token === undefined) return;
    tokens.push(String(token));
  };

  const pushValue = (entry) => {
    if (entry === null || entry === undefined) return;
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
  ...overrides,
});

const toAbsoluteUrl = (url) => {
  if (!url) {
    return null;
  }

  // Already absolute
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const baseUrl =
    process.env.STRAPI_ADMIN_BACKEND_URL ||
    process.env.STRAPI_BACKEND_URL ||
    process.env.STRAPI_URL ||
    "";

  if (!baseUrl) {
    // Fallback: return as-is if no base URL is configured
    return url;
  }

  // Ensure exactly one slash between baseUrl and path
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

  const url =
    entry.url ||
    entry.formats?.large?.url ||
    entry.formats?.medium?.url ||
    entry.formats?.small?.url ||
    entry.formats?.thumbnail?.url ||
    null;

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

async function loadPlatformInfo(strapi, options = {}) {
  if (!strapi) {
    throw new Error("A Strapi instance is required to load platform info");
  }

  const fallback = buildFallback(options.fallback);
  const logger = options.logger || strapi.log;

  const model =
    (typeof strapi.contentType === "function" &&
      strapi.contentType("api::app-config.app-config")) ||
    (typeof strapi.getModel === "function" &&
      strapi.getModel("api::app-config.app-config")) ||
    {};

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

  const shouldPopulateBottomContent =
    bottomContentField &&
    ["relation", "component", "dynamiczone", "media"].includes(
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
                  district: true,
                },
              },
            },
          },
        },
      },
    };

    if (shouldPopulateBottomContent) {
      populate[bottomContentField] = true;
    }

    const config = await strapi
      .documents("api::app-config.app-config")
      .findFirst({
        status: "published",
        populate,
      });

    if (!config) {
      return fallback;
    }

    // Resolve wallets
    const cpWallets = config.company_profile?.wallets || [];
    // Prefer EARNINGS_WALLET for the main platform wallet ref
    const earningsWallet = cpWallets.find(w => w.wallet_type === "EARNINGS_WALLET");
    const primaryWallet = earningsWallet || cpWallets[0] || null;

    let companyProfile = {
      name: config.company_profile?.name || fallback.name,
      supportEmail: config.supportEmail || "abc@xyz.com",
      logo: resolveMediaUrl(config.logo) || fallback.logo,
      companyProfile: config.company_profile,
      monthlyStatementBottomContent: normalizeBlocksField(
        (bottomContentField && config[bottomContentField]) ||
        config.monthly_statement_bottom_content ||
        config.monthly_statment_bottom_content
      ),
      wallet: primaryWallet, // Backwards compatibility / Main usage
      wallets: cpWallets,    // Expose all if needed
      gstDetail: config.company_profile?.gst_detail || null,
      expert: config.company_profile?.expert || null,
      is_live: config.company_profile?.documentId ? true : false,
    };

    // console.log("Loaded platform config:", companyProfile);
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
      ...fallback,
    };
  }
}


// Helper to get or create a specific wallet type for a user
const getWallet = async (userId, type) => {
  if (!userId) return null;

  // Try to find existing wallet of this type
  const wallets = await strapi.entityService.findMany("api::wallet.wallet", {
    filters: {
      user: userId,
      wallet_type: type
    },
    limit: 1,
  });

  if (wallets && wallets.length > 0) {
    return wallets[0];
  }

  // Create if not exists (Auto-create logic similar to lifecycles)
  // Default non-active for safety, or active? Lifecycles use active: true
  try {
    const newWallet = await strapi.entityService.create("api::wallet.wallet", {
      data: {
        user: userId,
        balance: 0,
        isActive: true,
        wallet_type: type
      },
    });
    return newWallet;
  } catch (err) {
    strapi.log.error(`Failed to create ${type} wallet for user ${userId}:`, err);
    return null;
  }
};


const dashboard = ({ strapi }) => ({

  // ----------------------------------------------------------
  // 1. GET /admin-pannel/stream
  // ----------------------------------------------------------
  async stream(ctx) {
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    ctx.status = 200;

    // ---------------------------------------------------------------------
    //  stats
    // ---------------------------------------------------------------------
    try {
      const stats = await strapi.plugin('admin-pannel').service("dashboard").getDashboardStats({}) || {};
      ctx.res.write(`data: ${JSON.stringify({ stats })}\n\n`);
    } catch (e) { strapi.log.error("Stream stats push failed", e); }


    // ---------------------------------------------------------------------
    //  live calls
    // ---------------------------------------------------------------------
    try {
      const liveCalls = await strapi.plugin('admin-pannel').service("dashboard").getLiveCalls() || [];
      ctx.res.write(`data: ${JSON.stringify({ liveCalls })}\n\n`);
    } catch (e) { strapi.log.error("Stream liveCalls push failed", e); }


    // ---------------------------------------------------------------------
    //  recent calls
    // ---------------------------------------------------------------------
    try {
      const recent = await strapi.plugin('admin-pannel').service("dashboard").getRecentCalls({ pagination: { pageSize: 20 } }) || { data: [] };
      ctx.res.write(`data: ${JSON.stringify({ recentCalls: recent.data || [] })}\n\n`);
    } catch (e) { strapi.log.error("Stream recentCalls push failed", e); }


    // ---------------------------------------------------------------------
    //  category stats
    // ---------------------------------------------------------------------
    try {
      const categoryStats = await strapi.plugin('admin-pannel').service("dashboard").getCategoryStats({}) || [];
      ctx.res.write(`data: ${JSON.stringify({ categoryStats })}\n\n`);
    } catch (e) { strapi.log.error("Stream categoryStats push failed", e); }

    strapi.plugin('admin-pannel').service('sse').addClient(ctx.res);






    const hb = setInterval(() => {
      try { ctx.res.write(`: ping ${Date.now()}\n\n`); } catch { }
    }, 15000);

    ctx.req.on('close', () => {
      clearInterval(hb);
      strapi.plugin('admin-pannel').service('sse').removeClient(ctx.res);
    });

    ctx.respond = false;
  },


  // ----------------------------------------------------------
  // 2. GET /admin-pannel/recent-calls
  // ----------------------------------------------------------
  async recentCalls(ctx) {
    try {
      const result = await strapi.plugin('admin-pannel').service("dashboard").getRecentCalls({
        filters: ctx.query?.filters || {},
        pagination: ctx.query?.pagination || {}
      });
      return ctx.send(result);
    } catch (error) {
      strapi.log.error("recentCalls error", error);
      return ctx.internalServerError(error.message || "recentCalls failed");
    }
  },


  // ----------------------------------------------------------
  // 3. GET /admin-pannel/category-stats
  // ----------------------------------------------------------
  async categoryStats(ctx) {
    try {
      const rows = await strapi.plugin('admin-pannel').service("dashboard").getCategoryStats({
        filters: ctx.query?.filters || {}
      });
      return ctx.send(rows);
    } catch (error) {
      strapi.log.error("categoryStats error", error);
      return ctx.internalServerError(error.message || "categoryStats failed");
    }
  },

  // ----------------------------------------------------------
  // 4. GET /admin-pannel/stats
  // ----------------------------------------------------------
  async getStats(ctx) {
    try {
      const stats = await strapi.plugin('admin-pannel').service("dashboard").getDashboardStats({
        filters: ctx.query?.filters || {}
      });
      return ctx.send(stats);
    } catch (error) {
      strapi.log.error("getStats error", error);
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
      // Step 1: Validation & Setup
      const { callId } = ctx.request.body || {};
      const adminUser = ctx.state.user || {};
      console.log("🔔 [Callend] adminUser", adminUser);
      // if (!adminUser) {
      //     return ctx.unauthorized("Authentication required. This API must be called from the admin panel.");
      // }

      const endedByInfo = {
        id: adminUser.id,
        name: `${adminUser.firstname || ''} ${adminUser.lastname || ''}`.trim(),
        role: adminUser.roles?.[0]?.name || 'Admin',
        documentId: adminUser.documentId
      };

      // Secure: Force Server Time for accurate billing
      const endTime = new Date();

      if (!callId) {
        console.warn("🔔 [Callend] Missing callId");
        return ctx.badRequest("callId is required");
      }

      // Check Platform Status
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
            caller: { populate: ["wallets"] },
            receiver: { populate: ["wallets", "expert", "expert.rates"] },
          },
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


      // Handle "Pending" Calls (Never Started) -> Mark as Declined
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
          callId: existingCall.id,
        };

        const declinedCall = await strapi.entityService.update(
          "api::call.call",
          callId,
          {
            data: {
              callStatus: "force complete by admin",
              endTime: endTime || new Date(),
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

        // Notifications
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
              android: { priority: "high" },
            });
          }
        } catch (e) { console.warn("🔔 [Callend] Notification error:", e); }

        return ctx.send({
          success: true,
          call: declinedCall,
          message: "Call declined/cancelled (not started).",
        });
      }

      if (!startTime || isNaN(startTime.getTime())) {
        console.warn("🔔 [Callend] Invalid start time:", existingCall.startTime);
        return ctx.badRequest("Call has no valid start time.");
      }

      // Use the server-generated endTime
      const endTimeDate = endTime;

      // Step 2: Duration & Cost Calculation
      let durationSec = Math.floor((endTimeDate.getTime() - startTime.getTime()) / 1000);

      // Guard against negative duration or overflow (e.g. if system time was wrong)
      if (durationSec < 0) durationSec = 0;
      // But let's just ensure it's finite.
      if (!Number.isFinite(durationSec)) durationSec = 0;

      const durationMin = (durationSec / 60).toFixed(2);
      // Ensure minimum duration is 1 minute, and always round UP to the next full minute (e.g. 1.02 -> 2)
      const minutes = Math.max(1, Math.ceil(durationSec / 60));

      const receiverRates = existingCall.receiver.expert.rates;
      let rate = 0;
      if (type === 'videoCall') {
        rate = receiverRates && receiverRates.videoCallRate != null ? Number(receiverRates.videoCallRate) : 0;
      } else if (type === 'voiceCall') {
        rate = receiverRates && receiverRates.voiceCallRate != null ? Number(receiverRates.voiceCallRate) : 0;
      }

      const totalCost = minutes * rate; // CALL_CHARGE amount

      console.log("🔔 [Callend] Calculated:", { durationSec, durationMin, minutes, rate, totalCost });


      // Step 3: Billing Configuration & Wallets
      const [pricingRaw] = await Promise.all([
        strapi.entityService.findMany("api::pricing-config.pricing-config", { limit: 1 }),
      ]);
      const settings = Array.isArray(pricingRaw) ? pricingRaw[0] : pricingRaw;
      if (!settings) {
        console.warn("🔔 [Callend] Pricing config missing");
        return ctx.badRequest("Pricing config not found.");
      }
      //f
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

      // 3.1 Resolving Wallets with specific types
      // Client pays from CASH_WALLET
      const callerWallet = await getWallet(caller.id, "CASH_WALLET");
      // Expert receives in EARNINGS_WALLET
      const receiverWallet = await getWallet(receiver.id, "EARNINGS_WALLET");

      if (!callerWallet) {
        console.warn("🔔 [Callend] Caller CASH_WALLET missing", caller.id);
        return ctx.badRequest("Caller wallet not found.");
      }
      if (!receiverWallet) {
        console.warn("🔔 [Callend] Receiver EARNINGS_WALLET missing/failed create", receiver.id);
        return ctx.badRequest("Receiver wallet error.");
      }

      // Step 4: Commission & Payout Calculation
      const commissionPercentagePerMin = type === "voiceCall"
        ? Number(settings.VoiceCall_Percentage_Commission || 0)
        : Number(settings.VideoCall_Percentage_Commission || 0);

      const minimumFixedCommission = type === "voiceCall"
        ? Number(settings.Minimum_VoiceCall_Commission_Fixed || 0)
        : Number(settings.Minimum_videoCall_Commission_Fixed || 0);

      // Total Commission Calculation
      const costPerMinute = totalCost / (minutes || 1);
      const percentageBasedCommission = costPerMinute * (commissionPercentagePerMin / 100) * minutes;
      const platformFee = Math.max(percentageBasedCommission, minimumFixedCommission); // Commission Amount

      const expertPayout = totalCost - platformFee; // EXPERT_PAYOUT amount

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
        startTime: startTime,
        endTime: endTime,
        durationSec,
        durationMin,
        ratePerMin: rate,
        commissionPercentage: commissionPercentagePerMin,
        minFixedCommission: minimumFixedCommission,
        totalCost: totalCost,
        platformFee: platformFee,
        expertEarnings: expertPayout,
        breakdown: {
          rate: rate,
          minutes: minutes,
          formula: `${rate} * ${minutes}`
        }
      };

      // Step 5: Update Call Entity (Pre-transaction)
      const updatedCall = await strapi.entityService.update("api::call.call", callId,
        {
          data: {
            callStatus: "force complete by admin",
            endTime: endTime,
            duration: Number(durationMin || 0), // Actual duration
            totalCost: Number(totalCost || 0), // Billed cost (min 1 min)
            type,
            duration_sec: durationSec,
            metadata: commonMetadata, // Sync metadata
          },
          populate: {
            caller: { populate: ["wallets"] },
            receiver: { populate: ["wallets"] }
          }
        }
      );

      // Check validity for billing
      if (minutes <= 0 || totalCost <= 0) {
        // Notify logic for no billing
        try {
          const callerUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
          const receiverUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
          const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
          if (tokens.length) {
            await sendToTokens(tokens, {
              data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
              android: { priority: "high" },
            });
          }
        } catch (e) { strapi.log.warn("CALL_ENDED push skipped:", e?.message || e); }

        return ctx.send({
          success: true,
          call: updatedCall,
          message: "Call ended (no billing).",
        });
      }

      // Step 6: Transactions (One Platform Wallet Model)
      const transactionId = `TXN-${Date.now()}`;

      // 6.1 Transaction: Caller -> Platform (CALL_CHARGE)
      const callChargeTxn = await strapi.entityService.create("api::transaction.transaction",
        {
          data: {
            amount: totalCost, // Amount Charged
            transactionType: "transfer",
            method: "walletTowallet",
            paymentStatus: "success",
            FromWallet: callerWallet.id,
            to_wallet: adminWallet.id, // Platform receives full amount
            call: callId,
            transaction_Id: `${transactionId}-CHARGE`,
            Note: `₹ ${totalCost} go from ${caller.username || caller.email} to Platform`,
            metadata: {
              ...commonMetadata,
              description: "Call Cost paid to Platform",
              type: "CALL_CHARGE"
            },
          },
        }
      );

      // 6.2 Transaction: Platform -> Expert (EXPERT_PAYOUT)
      const expertPayoutTxn = await strapi.entityService.create(
        "api::transaction.transaction",
        {
          data: {
            amount: expertPayout, // Earnings Paid
            transactionType: "transfer",
            method: "walletTowallet",
            paymentStatus: "success",
            FromWallet: adminWallet.id, // Platform pays Expert
            to_wallet: receiverWallet.id,
            user: receiver.id, // Link to expert user
            call: callId,
            transaction_Id: `${transactionId}`,
            Note: `₹ ${expertPayout} go from Platform to ${receiver.username || receiver.email}`,
            metadata: {
              ...commonMetadata,
              description: "Expert Payout from Platform",
              type: "EXPERT_PAYOUT"
            },
          },
        }
      );

      // Step 7: Update Expert Stats
      try {
        // ✅ NEW: Set Receiver Expert Status to 'online' (Call Ended)
        if (receiver?.expert?.documentId) {
          try {
            await strapi.documents("api::expert-profile.expert-profile").update({
              documentId: receiver.expert.documentId,
              data: { user_status: "online" },
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
            minutes: Number(durationMin || 0),
          });
        }
      } catch (e) {
        strapi.log.warn("incrementExpertDurations failed:", e?.message || e);
      }

      // Step 8: Final Notification (UI Sync)
      try {
        const callerUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.caller.id, { fields: ["firebaseTokens"] });
        const receiverUser = await strapi.entityService.findOne("api::public-user.public-user", updatedCall.receiver.id, { fields: ["firebaseTokens"] });
        const tokens = uniqueTokens([...normalizeFirebaseTokens(callerUser?.firebaseTokens), ...normalizeFirebaseTokens(receiverUser?.firebaseTokens)]);
        if (tokens.length) {
          await sendToTokens(tokens, {
            data: { type: "CALL_ENDED", callId: String(callId), dismissNotification: "true" },
            android: { priority: "high" },
          });
        }
      } catch (e) { strapi.log.warn("CALL_ENDED push skipped:", e?.message || e); }

      return ctx.send({
        success: true,
        call: updatedCall,
        transactions: [callChargeTxn, expertPayoutTxn],
        message: "Call ended and billed successfully.",
      });

    } catch (error) {
      strapi.log.error("Callend Error:", error);
      return ctx.internalServerError("An error occurred while ending call.");
    }
  },
});

export default dashboard;