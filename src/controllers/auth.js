import {refreshSession} from '../services/auth.js';


const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
  };


export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await refreshSession({
      refreshToken,
      sessionId,
    });
    setupSession(res, session);
  
    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  };