import Header from "@/components/header/Header";
import Button from "@/components/__common__/button/Button";
import "./globals.scss";

export default function Custom404() {
  return (
    <div className="not-found">
      <Header />
      <h2 className="h2-heading">404</h2>
      <p>The page you were looking for does not exist.</p>
      <p>You may have mistyped the address or the page may have moved.</p>
      <Button text="Home page" variant="primary" navigateHome={true} />
    </div>
  );
}
