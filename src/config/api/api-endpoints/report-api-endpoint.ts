import apiService from '@/utils/services/api-service';

export const reportAPIEndpoint = {
  getPdfDownload: (userSlug: string) =>
    apiService.get(`/reports/pdf/${userSlug}`, {
      responseType: 'blob',
    }),
  getCsvDownload: (userSlug: string) =>
    apiService.get(`/reports/csv/${userSlug}`, {
      responseType: 'blob',
    }),
};
