import Cache from "./cache";
import type { Result } from "../types/globalTypes";

export const globalCache = new Cache<Result>();