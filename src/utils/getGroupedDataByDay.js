export const getGroupedDataByDay = async (data) => {
    const groupedData = new Map();

    await data.forEach(item => {
        const date = new Date(item.date);
        const dayKey = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Форматуємо дату як "DD.MM"

        // Якщо такий день вже є в Map, додаємо дані
        if (groupedData.has(dayKey)) {
          const existingData = groupedData.get(dayKey);
          existingData.dailyNorm += item.dailyNorm;
          existingData.waterVolume += item.waterVolume;
          existingData.count += 1;
          groupedData.set(dayKey, existingData);
        } else {
          // Якщо такого дня ще немає, створюємо новий запис
          groupedData.set(dayKey, {
            date: dayKey,
            dailyNorm: item.dailyNorm,
            waterVolume: item.waterVolume,
            count: 1
          });
        }
      });

      // Перетворюємо Map на масив об'єктів
    const result = Array.from(groupedData.values()).map(entry => {
        const dailyNormAvg = entry.dailyNorm / entry.count;  // Середнє dailyNorm
        const waterVolumeAvg = entry.waterVolume / entry.count;  // Середнє waterVolume
        const percent = (waterVolumeAvg / dailyNormAvg) * 100;  // Відсоток співвідношення

        return {
          date: entry.date,
          dailyNorm: dailyNormAvg.toFixed(0),  // Округлюємо
          waterVolume: waterVolumeAvg.toFixed(0),  // Округлюємо
          count: entry.count,
          percent: percent.toFixed(0)  // Округлюємо
        };
      });

      return result;

};

