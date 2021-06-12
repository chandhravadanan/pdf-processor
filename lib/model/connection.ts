import mongoose from 'mongoose';
import logger from '../util/logger';

const initConn = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB}`, { useNewUrlParser: true });
    logger.info('[initConn] Mongodb connected successfuly');
  } catch (err) {
    logger.error('[initConn] Mongodb connection error', err);
  }
};

initConn();

export default mongoose;
