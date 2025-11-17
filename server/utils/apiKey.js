import crypto from "crypto";

export function generateApiKey() {
  return "ins_" + crypto.randomBytes(32).toString("hex");
}
