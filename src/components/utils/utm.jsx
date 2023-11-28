export default function utm(source, medium, campaign) {
    // source - Источник трафика
    // medium - Тип трафика
    // campaign - Название кампании

    var linkUTM = 
        '?utm_source=' + source + 
        '&utm_medium=' + medium +
        '&utm_campaign=' + campaign
    
    return linkUTM
};