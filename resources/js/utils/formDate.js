import { ru } from "date-fns/locale";
import {formatDistance} from "date-fns";

export const formatDate = (createdAt) =>
  formatDistance(new Date(createdAt), new Date(), {
    locale: ru,
    addSuffix: true,
    includeSeconds: true,
  });
