/**
 * this function is global exception handler
 * @param {Function} fn 
 * @returns 
 */

export const TryCatch = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
