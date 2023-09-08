import { setupCredentialLd } from "./setup";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    Hello world
  </div>
`;

setupCredentialLd();
