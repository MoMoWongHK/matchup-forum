import { NextFunction, Request, Response } from "express";
import { isEmailRegistered } from "../helperFunction/userDBHelper";

// --------------- check whether the user is exist ------------------

interface isEmailExistsBody {
  email: string;
}

/**
 * check whether is email is registered
 * @param req
 * @param {string} req.body.email - kol / customer email
 * @param res
 * @returns {Promise<Response>}
 */
export const isUserEmailRegistered = async (
  req: Request<undefined, undefined, isEmailExistsBody>,
  res: Response<
    | {
        success: boolean;
        exists: boolean;
      }
    | { success: false }
  >,
  next: NextFunction
): Promise<Response> => {
  try {
    const result = await isEmailRegistered(req.body.email);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        exists: false,
      });
    }
    return res.status(200).json({
      success: true,
      exists: result.exists,
    });
  } catch (err) {
    console.log(err);
    next(err);
    return res.status(500).json({
      success: false,
    });
  }
};
