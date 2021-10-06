import { IDateProvider } from "./IDateProvider";
import { container } from "tsyringe";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DateProvider",
  DayjsDateProvider
);
