
"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sessions } from "@/lib/data";

const statusConfig: Record<string, { color: string }> = {
    'Confirmada': { color: '#22c55e' }, // green-500
    'Pendiente': { color: '#f59e0b' },  // amber-500
    'Cancelada': { color: '#ef4444' },    // red-500
};

export function SessionsStatusChart() {
    const statusCounts = sessions.reduce((acc, session) => {
        acc[session.status] = (acc[session.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(statusCounts).map(([name, value]) => ({
        name,
        value,
        fill: statusConfig[name]?.color || '#8884d8',
    }));

    const colors = chartData.map(entry => entry.fill);

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>Estado de las Sesiones</CardTitle>
                <CardDescription>Distribución de todas las sesiones registradas.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                 {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <RechartsTooltip 
                                 contentStyle={{
                                    borderRadius: "var(--radius)",
                                    border: "1px solid hsl(var(--border))",
                                    background: "hsl(var(--background))",
                                }}
                            />
                            <Pie 
                                data={chartData} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={70} 
                                outerRadius={100} 
                                paddingAngle={5} 
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">No hay datos de sesiones para mostrar.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
