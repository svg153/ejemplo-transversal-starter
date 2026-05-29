import type { NextFunction, Request, Response } from 'express'; // Import the Express types used by the middleware.
import jwt, { JsonWebTokenError, TokenExpiredError, type JwtPayload } from 'jsonwebtoken'; // Reuse the installed JWT library for token verification.

import { config } from '../config'; // Reuse the centralized runtime configuration.

export type AuthenticatedUser = JwtPayload & { // Describe the authenticated user data exposed to routes.
  userId: string; // Require a stable user identifier in the JWT payload.
  email: string; // Require the user email in the JWT payload.
  role: string; // Require the user role in the JWT payload.
}; // Finish the authenticated user contract.

declare module 'express-serve-static-core' { // Augment Express request typing with the authenticated user.
  interface Request { // Extend the shared request interface used across routes.
    user?: AuthenticatedUser; // Store the verified user payload on the request object.
  } // Finish the request augmentation.
} // Finish the module augmentation.

function getBearerToken(request: Request): string | null { // Extract the bearer token from the authorization header.
  const authorizationHeader = request.header('authorization'); // Read the authorization header case-insensitively.

  if (!authorizationHeader) { // Reject requests that omit the authorization header.
    return null; // Signal the missing token to the caller.
  } // Finish the missing-header guard.

  const [scheme, token] = authorizationHeader.split(' '); // Split the header into the auth scheme and token.

  if (scheme !== 'Bearer' || !token) { // Reject malformed authorization headers.
    return null; // Signal that no valid bearer token was provided.
  } // Finish the malformed-header guard.

  return token; // Return the extracted bearer token.
} // Finish the bearer token extractor.

function isAuthenticatedUser(payload: string | JwtPayload): payload is AuthenticatedUser { // Validate the decoded payload shape before exposing it to routes.
  if (typeof payload === 'string') { // Reject string payloads because routes expect a structured object.
    return false; // Signal that the payload shape is invalid.
  } // Finish the string-payload guard.

  return ( // Validate the minimum claims required by the starter routes.
    typeof payload.userId === 'string' && // Ensure the payload carries a string user identifier.
    typeof payload.email === 'string' && // Ensure the payload carries a string email.
    typeof payload.role === 'string' // Ensure the payload carries a string role.
  ); // Finish the payload shape validation.
} // Finish the authenticated user type guard.

export function requireAuth(request: Request, response: Response, next: NextFunction): void { // Verify JWTs and expose the authenticated user to protected routes.
  const token = getBearerToken(request); // Extract the bearer token from the incoming request.

  if (!token) { // Reject requests that do not include a valid bearer token.
    response.status(401).json({ error: 'Unauthorized' }); // Return the expected unauthorized response.
    return; // Stop the middleware pipeline after the 401 response.
  } // Finish the missing-token guard.

  try { // Isolate JWT verification failures in a dedicated error branch.
    const decodedPayload = jwt.verify(token, config.jwtSecret); // Verify the token signature and expiration using the shared secret.

    if (!isAuthenticatedUser(decodedPayload)) { // Reject tokens that do not contain the required claims.
      response.status(401).json({ error: 'Unauthorized' }); // Return the same unauthorized response for invalid payloads.
      return; // Stop the middleware pipeline after the 401 response.
    } // Finish the payload-shape guard.

    request.user = decodedPayload; // Expose the verified JWT payload to downstream route handlers.
    next(); // Continue to the protected route handler.
  } catch (error: unknown) { // Handle verification failures explicitly and safely.
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) { // Collapse known JWT failures into a single unauthorized response.
      response.status(401).json({ error: 'Unauthorized' }); // Avoid leaking token validation details to clients.
      return; // Stop the middleware pipeline after the 401 response.
    } // Finish the known-JWT-error guard.

    next(error); // Delegate unexpected failures to Express error handling.
  } // Finish JWT verification handling.
} // Finish the auth middleware implementation.