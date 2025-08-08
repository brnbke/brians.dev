"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";

interface QRCodeColors {
  dark: string;
  light: string;
}

interface QRCodeGeneratorProps {
  colors?: QRCodeColors;
  randomColors?: boolean;
}

function QRCodeContent({ colors, randomColors }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Generate random hex color
  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  // Get colors based on props
  const getColors = (): QRCodeColors => {
    if (randomColors) {
      return {
        dark: generateRandomColor(),
        light: generateRandomColor(),
      };
    }

    if (colors) {
      return colors;
    }

    // Default colors (rebeccapurple)
    return {
      dark: "#663399",
      light: "#FFFFFF",
    };
  };

  // Abstracted QR code generation function
  const generateQRCode = async (url: string) => {
    try {
      const qrColors = getColors();
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: qrColors,
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
              <Image
                src={qrCodeUrl}
                alt="QR Code for current URL"
                width={400}
                height={400}
                className="mx-auto rounded-lg shadow-md"
                unoptimized
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

export default function QRCodeGenerator({
  colors,
  randomColors,
}: QRCodeGeneratorProps = {}) {
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
      <QRCodeContent colors={colors} randomColors={randomColors} />
    </Suspense>
  );
}
