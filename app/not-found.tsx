import QRCodeGenerator from "./components/qr-code-generator";

export default function NotFound() {
  // Use random colors for 404 pages to make them more visually distinct
  return <QRCodeGenerator randomColors={true} />;
}
