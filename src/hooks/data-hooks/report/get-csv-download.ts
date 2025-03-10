import { useQuery } from '@tanstack/react-query';
import { reportAPIEndpoint } from '@/config/api/api-endpoints/report-api-endpoint';
import { handleApiError } from '@/utils/error/api-error-handler';

const useGetCsvDownload = (downloadCsv: boolean, userSlug: string) => {
  return useQuery({
    queryKey: ['getCsvDownload', downloadCsv, userSlug],
    enabled: !!downloadCsv && !!userSlug,
    queryFn: async () => {
      try {
        const response = await reportAPIEndpoint.getCsvDownload(userSlug);
        return response;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

export default useGetCsvDownload;
