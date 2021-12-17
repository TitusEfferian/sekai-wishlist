import * as admin from 'firebase-admin'
import key from '../../firebase_key.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(key),
  })
}

export default admin