import { hash, verify } from "argon2";
import { Request, Response } from "express";
import User, { IUser } from "../Schemas/User";

export const register = async (req: Request, res: Response) => {
  const { username, password, type } = req.body;

  if (
    username.trim().length === 0 ||
    password.trim().length === 0 ||
    !["seller", "buyer"].includes(type.trim().toLowerCase())
  ) {
    res.status(500).json({
      message: "Body Fields are incorrect",
    });
    return;
  }

  let lowerUsername = username.toLowerCase();
  console.log(lowerUsername);

  try {
    let checkUser = await User.findOne({ username: lowerUsername });
    console.log(checkUser);
    if (checkUser) {
      res.status(500).json({
        message: "user already exist",
      });
      return;
    }
    const user: IUser = new User({
      username: lowerUsername,
      type,
    });

    // user.password=
    user.password = await hash(password);

    await user.save();
    res.status(200).json({
      message: "Register success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message ?? "Something went wrong",
    });
  }
  //   res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username.trim().length === 0 || password.trim().length === 0) {
    return res.status(500).json({
      message: "Body Fields are incorrect",
    });
  }

  let lowerUsername = username.toLowerCase();

  try {
    let checkUser = await User.findOne({ username: lowerUsername });

    if (!checkUser) {
      res.status(500).json({
        message: "user does not exist",
      });
      return;
    }

    const valid = await verify(checkUser.password, password);

    if (!valid) {
      return res.status(500).json({
        message: "username or password are incorrect",
      });
    }

    req.session.user = checkUser;
    res.status(200).json({
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message ?? "Something went wrong",
    });
  }
};
