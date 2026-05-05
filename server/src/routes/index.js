import callingRoutes from './calling';
import referralRoutes from './referral';

export default {
  'admin': {
    type: 'admin',
    routes: [
      ...callingRoutes.routes,
      ...referralRoutes.routes,
    ],
  },
};
