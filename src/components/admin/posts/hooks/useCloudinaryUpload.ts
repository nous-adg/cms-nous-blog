
import { useEffect, useCallback } from 'react';
import { CLOUDINARY_CONFIG, type CloudinaryUploadResult } from '@/lib/cloudinary';

interface UseCloudinaryUploadOptions {
    onSuccess: (result: CloudinaryUploadResult) => void;
    onError?: (error: any) => void;
    folder?: string;
    multiple?: boolean;
    maxFiles?: number;
    clientAllowedFormats?: string[];
}

export function useCloudinaryUpload({
    onSuccess,
    onError,
    folder = 'blog',
    multiple = false,
    maxFiles = 1,
    clientAllowedFormats = ['image'],
}: UseCloudinaryUploadOptions) {
    useEffect(() => {
        if (!window.cloudinary) {
            const script = document.createElement('script');
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    const openUploadWidget = useCallback(() => {
        if (!window.cloudinary) {
            alert('Cloudinary widget no está cargado. Por favor recarga la página.');
            return;
        }

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: CLOUDINARY_CONFIG.cloudName,
                uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
                folder: folder,
                multiple: multiple,
                maxFiles: maxFiles,
                clientAllowedFormats: clientAllowedFormats,
                sources: ['local', 'url', 'camera'],
                showAdvancedOptions: false,
                cropping: false,
                styles: {
                    palette: {
                        window: '#FFFFFF',
                        windowBorder: '#90A0B3',
                        tabIcon: '#16a34a',
                        menuIcons: '#5A616A',
                        textDark: '#000000',
                        textLight: '#FFFFFF',
                        link: '#16a34a',
                        action: '#16a34a',
                        inactiveTabIcon: '#0E2F5A',
                        error: '#F44235',
                        inProgress: '#16a34a',
                        complete: '#20B832',
                        sourceBg: '#E4EBF1',
                    },
                },
            },
            (error: any, result: any) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    onError?.(error);
                    return;
                }

                if (result.event === 'success') {
                    onSuccess(result.info as CloudinaryUploadResult);
                }
            }
        );

        widget.open();
    }, [onSuccess, onError, folder, multiple, maxFiles, clientAllowedFormats]);

    return { openUploadWidget };
}
