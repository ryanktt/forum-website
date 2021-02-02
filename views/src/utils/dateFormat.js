import moment from 'moment';

export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}



export const dateFormat = (date) => {

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)
    const threadDate = new Date(date); 

    const hours = threadDate.getHours();
    const minutes = String(threadDate.getMinutes()).padStart(2, "0");

    const isSameMinute = threadDate.getDate() === today.getDate() 
    && hours === today.getHours()
    && threadDate.getMinutes() === today.getMinutes();
    const isSameHour = threadDate.getDate() === today.getDate() && hours === today.getHours();
    const isToday = (today.getDate() === threadDate.getDate());
    const isYesterday = (threadDate.getDate() === yesterday.getDate())
    const isSameWeek = (moment(threadDate).week() === moment(today).week() && moment(threadDate).year() === moment(today).year());

    if(isSameMinute) {
        return `Um momento atrás`;
    }

    if(isSameHour) {
        const mins = Number(today.getMinutes()) - Number(minutes);
        return `${mins} minutos atrás`
    }
    if(isToday){
        return `Hoje às ${hours}:${minutes}`;
    }

    if(isYesterday){
        return `Ontem às ${hours}:${minutes}`;
    }

    if(isSameWeek){
        return `${toTitleCase(threadDate.toLocaleDateString('pt-bt', {weekday: 'long'}))}
             às ${hours}:${minutes}`;
        
    }

    const monthString = `${toTitleCase(threadDate.toLocaleDateString('pt-br', {month: 'long'}))}`;
    return `${monthString}, ${threadDate.getDate()} ${moment(threadDate).year()}`
}
