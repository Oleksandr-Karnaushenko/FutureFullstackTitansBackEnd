
import * as waterServices from "../services/water.js";

export const getMonthWaterVolumeController = async () => {

    const data = await waterServices.getMonthWaterVolume({

      });

     console.log(data);


};


