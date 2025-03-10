'use client';
import ClientDetailsCard from '@/app/dashboard/components/ClientDetailsCard';
import {
  DownloadIconTwo,
  FilterIcon,
} from '@/assets/icons/bussiness-panel-icons';
import useGetPdfDownload from '@/hooks/data-hooks/report/get-pdf-download';
import BarChart from '@/shared-components/chart/BarChart';
import CustomButton from '@/shared-components/CustomButton';
import { RootState } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import useGetCsvDownload from '@/hooks/data-hooks/report/get-csv-download';
import { useForm } from 'react-hook-form';

const Report = () => {
  const data: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  //const [clientSlug, setClientSlug] = useState('');
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [downloadCsv, setDownloadCsv] = useState(false);

  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { client, loading } = useSelector((state: RootState) => state.auth);

  const { watch, setValue } = useForm<{ downloadType: string }>({
    defaultValues: { downloadType: '' },
  });
  const downloadType = watch('downloadType');

  const { data: pdfData, isLoading: pdfLoading } = useGetPdfDownload(
    downloadPdf,
    client?.slug
  );

  const { data: csvData, isLoading: csvLoading } = useGetCsvDownload(
    downloadCsv,
    client?.slug
  );

  useEffect(() => {
    if (pdfData && downloadPdf) {
      //eslint-disable-next-line
      //@ts-ignore
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const filename = `report_${Date.now()}.pdf`;
      setDownloadPdf(false);
      saveAs(blob, filename);
    }
  }, [pdfData, downloadPdf]);

  useEffect(() => {
    if (csvData && downloadCsv) {
      //eslint-disable-next-line
      //@ts-ignore
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const filename = `report_${Date.now()}.csv`;
      setDownloadCsv(false);
      saveAs(blob, filename);
    }
  }, [csvData, downloadCsv]);

  useEffect(() => {
    if (downloadType) {
      if (downloadType === 'pdf') {
        setDownloadPdf(true);
      } else if (downloadType === 'csv') {
        setDownloadCsv(true);
      }
      // Reset the downloadType field so that a selection can be re-triggered.
      setValue('downloadType', '');
    }
  }, [downloadType, setValue]);

  // Add an event listener to detect clicks outside the dropdown.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the click happened outside the dropdown container, close the dropdown.
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowExportDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle function for the export dropdown.
  const toggleExportDropdown = () => {
    setShowExportDropdown((prev) => !prev);
  };

  // const handleDownload = () => {
  //   //setDownloadPdf(true);
  //   setDownloadCsv(true);
  // };

  return (
    <div className='p-4'>
      <ClientDetailsCard data={client} isLoading={loading} />
      <div className='rounded-extra-small mt-2 bg-primary-light p-4'>
        <div className='flex justify-between p-4'>
          <p className='text-large font-semibold'>Reports</p>
          <div className='flex items-center gap-2'>
            <CustomButton
              title='filter'
              icon={<FilterIcon />}
              className='border border-border-primary bg-primary-light text-primary-dark'
            />

            {/* Export button with dropdown */}
            <div className='relative' ref={dropdownRef}>
              <CustomButton
                title='export'
                disable={pdfLoading || csvLoading}
                onClick={toggleExportDropdown}
                icon={<DownloadIconTwo />}
              />
              {showExportDropdown && (
                <div className='absolute right-0 z-10 mt-1 rounded border bg-primary-light shadow-lg'>
                  <button
                    className='block w-full px-4 py-2 text-left hover:bg-content'
                    disabled={pdfLoading || csvLoading}
                    onClick={() => {
                      setDownloadPdf(true);
                      setShowExportDropdown(false);
                    }}
                  >
                    PDF
                  </button>
                  <button
                    disabled={csvLoading || pdfLoading}
                    className='block w-full px-4 py-2 text-left hover:bg-content'
                    onClick={() => {
                      setDownloadCsv(true);
                      setShowExportDropdown(false);
                    }}
                  >
                    CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='rounded-medium flex flex-col bg-card px-8 py-4'>
          <p className='p-4 capitalize'>income label</p>
          <div className='flex-1 bg-primary-light p-4'>
            <BarChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
