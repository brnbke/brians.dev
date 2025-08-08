import QRCodeGenerator from "./components/qr-code-generator";

export default function Home() {
  // Examples of how to use the color customization:

  // Default (rebeccapurple):
  return <QRCodeGenerator />;

  // Custom colors:
  // return <QRCodeGenerator colors={{ dark: "#ff0000", light: "#ffffff" }} />;

  // Random colors:
  // return <QRCodeGenerator randomColors={true} />;
}
