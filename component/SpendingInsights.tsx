const SpendingInsights = ({ budgets, transactions }: { budgets: any[]; transactions: any[] }) => {
    const insights = budgets.map((budget) => {
      const actualSpending = transactions
        .filter((transaction) => transaction.category === budget.category)
        .reduce((acc, curr) => acc + curr.amount, 0); // Sum of actual expenses for the category
  
      const difference = budget.amount - actualSpending;
      let insightMessage = "";
  
      if (difference > 0) {
        insightMessage = `You have ₹${difference} left in your ${budget.category} budget.`;
      } else if (difference < 0) {
        insightMessage = `You are over your ${budget.category} budget by ₹${Math.abs(difference)}.`;
      } else {
        insightMessage = `You have exactly met your ${budget.category} budget.`;
      }
  
      return {
        category: budget.category,
        message: insightMessage,
      };
    });
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Spending Insights</h3>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-sm">
              {insight.message}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SpendingInsights;
  