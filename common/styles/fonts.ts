import {
  Inter,
  Nunito,
  Inika,
  Inknut_Antiqua,
  Montserrat,
  Open_Sans,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const nunito = Nunito({ subsets: ["latin"] });

export const inika = Inika({ subsets: ["latin"], weight: "700" });

export const inknut = Inknut_Antiqua({ subsets: ["latin"], weight: "700" });

export const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });

export const montserratMedium = Montserrat({
  subsets: ["latin"],
  weight: "500",
});

export const montserratThin = Montserrat({ subsets: ["latin"], weight: "400" });

export const openSans = Open_Sans({ subsets: ["latin"] });
