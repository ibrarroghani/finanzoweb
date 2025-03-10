import { useQuery } from '@tanstack/react-query';
import { reportAPIEndpoint } from '@/config/api/api-endpoints/report-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetPdfDownload = (downloadPdf: boolean, userSlug: string) => {
  return useQuery({
    queryKey: ['getPdfDownload', downloadPdf, userSlug],
    enabled: !!downloadPdf && !!userSlug,
    queryFn: async () => {
      try {
        const response = await reportAPIEndpoint.getPdfDownload(userSlug);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetPdfDownload;
