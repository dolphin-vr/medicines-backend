import User from "../models/User.js";

export const keepAlive = async () => {
	await User.findOne({ email: 'keep@alive.srv' });
}