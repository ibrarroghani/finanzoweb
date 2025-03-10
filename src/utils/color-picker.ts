export const getChartColor = (status: string) => {
  if (status.toLowerCase() === 'active' || status.toLowerCase() === 'completed')
    return ['#3fa75a', '#34A8531A'];
  else return ['#ea4335', '#34A8531A'];
};
