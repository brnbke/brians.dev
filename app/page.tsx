"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import QRCode from "qrcode";

function QRCodeGenerator() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Abstracted QR code generation function
  const generateQRCode = async (url: string) => {
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: "#663399",
          light: "#FFFFFF",
        },
      });
      setQrCodeUrl(dataUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  // Generate QR code whenever pathname or search params change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      generateQRCode(currentUrl);
    }
  }, [pathname, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          {qrCodeUrl ? (
            <div className="space-y-6">
              <img
                src={qrCodeUrl}
                alt="QR Code for current URL"
                className="mx-auto rounded-lg"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <QRCodeGenerator />
    </Suspense>
  );
}
