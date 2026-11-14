export const formatMoney = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
export const formatDate = date => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));
