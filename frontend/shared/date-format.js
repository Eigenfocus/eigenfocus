import { format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

const locales = { enUS, ptBR };

function getLocale() {
  const locale = document.documentElement.lang;
  if (locale == 'pt-BR') {
    return 'ptBR';
  } else {
    return 'enUS';
  }
}
// https://date-fns.org/v4.1.0/docs/I18n
export default function dateFormat(date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: locales[getLocale()],
  });
}
