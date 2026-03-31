/**
 * Application methods
 */
import bootstrap from './bootstrap';
import destroy from './destroy';
import register from './register';

/**
 * Plugin server methods
 */
import config from './config';
import contentTypes from './content-types';
import controllers from './controllers';
import middlewares from './middlewares';
import policies from './policies';
import callingRoutes from './routes/calling';
import referralRoutes from './routes/referral';
import services from './services';

export default {
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
    referral: referralRoutes,
  },
  services,
};






// id: admin'--
// pass: abcde

// from users
// where password == pass and id == 'admin'--'