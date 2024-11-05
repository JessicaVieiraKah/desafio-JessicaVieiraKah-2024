function calculateRank(wins, losses) {
    // Calculate the win balance
    const winBalance = wins - losses;
    let level;

    // Determine the player's level based on the number of wins
    if (wins < 10) {
        level = "Iron";
    } else if (wins >= 11 && wins <= 20) {
        level = "Bronze";
    } else if (wins >= 21 && wins <= 50) {
        level = "Silver";
    } else if (wins >= 51 && wins <= 80) {
        level = "Gold";
    } else if (wins >= 81 && wins <= 90) {
        level = "Diamond";
    } else if (wins >= 91 && wins <= 100) {
        level = "Legendary";
    } else if (wins >= 101) {
        level = "Immortal";
    }

    // Display the player's balance and level
    console.log(`The Hero has a balance of ${winBalance} and is at the ${level} level.`);
}

// Example of calling the function
calculateRank(55, 10);
