import { customAlphabet } from "nanoid";

const nanoidSer = customAlphabet("QWERTYUIOPASDFGHJKLZXCVBNM", 2);
const nanoidNum = customAlphabet("1234567890", 8);

const orderNum = () => nanoidSer() + "-" + nanoidNum();

export default orderNum;