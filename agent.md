here is the given dummy data with info for the admin dashboard .....
{
  total: 15420,  // (count from public_profile minus test users and accountStatus is active)
  test: 640,   // (count from app_config sigle type table where test_accounts is a relational field stored list if public profile FK)
  experts: 4280,   // (count from public_profile table where role is expert and accountStatus is active)
  clients: 10500, // (count from public_profile table minus experts and accountStatus is active)
  expertsByStatus: { // (for approved/pending -> expert_profile table bool field as isApproved, for blocked | deleted -> public_profile table field as accountStatus)
    Approved: 4242,
    Pending: 38,
    Blocked: 320,
    Deleted: 160,
  },
  clientsByStatus: { // (for active | blocked | deleted -> public_profile table field as accountStatus)
    Active: 9800,
    Blocked: 450,
    Deleted: 250,
  },
  availability: { // (for online | offline | busy -> expert_profile table field as user_status, )
    Online: 145,
    Offline: 3600,
    Busy: 535,
  },
  badges: { // Expert_Verification where Payment_Received is true and Verified_Badge = true,
    // It has field as Identity_Verified, Address_Verified, Education_Verified, LinkedIn_Verified, GST_Verified, Bank_Verified and it will be named by remove _Verified and add badge i.e Identity Badge
    'Identity Badge': 1850,
    'Address Badge': 1240,
    'Education Badge': 860,
    'LinkedIn Badge': 330,
  },
  meta: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  growth: { // createdAt date wise data from public_profile where role is expert | client, 
    experts: [120, 135, 150, 140, 165, 180, 175],
    clients: [450, 480, 510, 490, 540, 590, 570],
  },
  wallet: {
    totalTopups: 850750, // transactions => meta field transactionType = 'topup', & paymentStatus =success, & meta.appliedPayUConfig.mode = 'production'
    referralDistributed: 42500, // from transaction table where method = Referral,
    trend: [12000, 15400, 14200, 18900, 22100, 21000, 25400], // date wise transaction => meta field transactionType = 'topup', & paymentStatus =success, & meta.appliedPayUConfig.mode = 'production'
    economy: { // this is confusing so this data we need to pass 0 from the backend from now
      audio: { clientSpent: 320000, expertEarned: 288000, commission: 32000 },
      video: { clientSpent: 530750, expertEarned: 477675, commission: 53075 },
    }
  },
  sparklines: {
    users: [100, 120, 115, 134, 145, 132, 160], // date wise count from public_profile where role is client
    experts: [40, 50, 48, 62, 58, 65, 72], // date wise count from expert_profile where role is expert
    topups: [3000, 4500, 4200, 5600, 5100, 6200, 6800], // date wise count from transactions where transactionType = 'topup', & paymentStatus =success, & meta.appliedPayUConfig.mode = 'production'
    referrals: [200, 450, 300, 600, 400, 550, 700], // date wise transaction table where method = Referral
  }
}