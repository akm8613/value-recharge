import { Request, Response } from "express";
import log from "../../lib/logger"; 
 const carrierData = {
      carriers: [
        {
          name: "Metro by T-Mobile",
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Metro_by_T-Mobile_logo.svg",
          plans: [
            { id: "metro-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "metro-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "metro-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        },
        {
          name: "AT&T",
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/AT%26T_logo_2016.svg",
          plans: [
            { id: "att-1", name: "Value Plus VL", amount: 30 },
            { id: "att-2", name: "Unlimited Extra EL", amount: 50 },
            { id: "att-3", name: "Unlimited Premium PL", amount: 80 },
          ],
        },
        {
          name: "Verizon",
          logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Verizon_2015_logo.svg",
          plans: [
            { id: "vz-1", name: "Unlimited Welcome", amount: 25 },
            { id: "vz-2", name: "Unlimited Plus", amount: 45 },
            { id: "vz-3", name: "Unlimited Ultimate", amount: 75 },
          ],
        },
        {
          name: "H2O Wireless",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/H2O_Wireless_logo.svg",
          plans: [
            { id: "h2o-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "h2o-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "h2o-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        },
        {
          name: "Cricket",
          logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Cricket_Wireless_logo.svg",
          plans: [
            { id: "crkt-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "crkt-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "crkt-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        },
        {
          name: "Simple Mobile",
          logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Simple_Mobile_logo.svg",
          plans: [
            { id: "smpl-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "smpl-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "smpl-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        },
        {
          name: "T-Mobile",
          logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/T-Mobile_logo_2022.svg",
          plans: [
            { id: "tm-1", name: "Go5G Next", amount: 20 },
            { id: "tm-2", name: "Go5G Plus", amount: 40 },
            { id: "tm-3", name: "Essentials Saver", amount: 60 },
          ],
        },
        {
          name: "Boost Mobile",
          logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Boost_Mobile_logo.svg",
          plans: [
            { id: "bst-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "bst-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "bst-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        },
        {
          name: "Lyca Mobile",
          logo: "https://upload.wikimedia.org/wikipedia/commons/0/07/Lycamobile_Logo.svg",
          plans: [
            { id: "lyca-1", name: "Prepaid Plan Starter", amount: 15 },
            { id: "lyca-2", name: "Prepaid Plan Core", amount: 35 },
            { id: "lyca-3", name: "Prepaid Plan Unlimited", amount: 65 },
          ],
        }
      ],
    };
export const getCarriers = async (req: Request, res: Response) => {
  const C = "CarrierController";
  const F = "getCarriers";
  
  const mobilenumber = req.query.mobilenumber || "unknown";

  // Displays the explicit API method and route called
  log.info(`[GET /api/recharge/carriers] ➔ [${C} -> ${F}], Mobile [${mobilenumber}]`);

  try {
   

    log.info(`[GET /api/recharge/carriers] ➔ [${C} -> ${F}], Mobile [${mobilenumber}] - Successfully dispatched ${carrierData.carriers.length} carrier profiles.`);
    return res.status(200).json(carrierData);

  } catch (error: any) {
    log.error(`[GET /api/recharge/carriers] ➔ [${C} -> ${F}] Exception encountered while pulling plans: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error loading plans." });
  }
};