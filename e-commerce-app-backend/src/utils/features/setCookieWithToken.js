export const setCookieWithToken = (res, user) => {
  const options = {
    expires: new Date(
      Date.now() + (6 || "7") * (24 * 60 * 60 * 1000)
    ),
    httpOnly: false,
    secure: true,
    sameSite: "none",
  };

  const token = user.getJWTToken();

  res.cookie("token", token, options);
};
