import { useState } from "react";

export default function ModeloColasMMM() {
  const [tasaLlegadaClientes, setTasaLlegadaClientes] = useState(20); // λ: Clientes que llegan por hora
  const [tasaAtencionPorCajero, setTasaAtencionPorCajero] = useState(30); // μ: Clientes que atiende cada cajero por hora
  const [cantidadCajeros, setCantidadCajeros] = useState(2); // m: Número de cajeros (servidores)
  const [horasTrabajoDiario, setHorasTrabajoDiario] = useState(8);
  const [costoPorCajeroPorHora, setCostoPorCajeroPorHora] = useState(15);
  const [costoEsperaPorClientePorHora, setCostoEsperaPorClientePorHora] = useState(50);
  const [ticketPromedioPorCliente, setTicketPromedioPorCliente] = useState(45);
  const [margenGananciaPorVenta, setMargenGananciaPorVenta] = useState(0.15);

  // Fórmula: ρ = λ / (m * μ)
  const tasaUtilizacionSistema = tasaLlegadaClientes / (cantidadCajeros * tasaAtencionPorCajero);

  function factorial(n: number): number {
    return n <= 1 ? 1 : n * factorial(n - 1);
  }

  function calcularProbabilidadSistemaVacio(): number {
    // Fórmula: P₀ = [Σ (n=0 to m-1) (λ/μ)^n / n! + (λ/μ)^m / (m! * (1 - ρ))]^-1
    let suma = 0;
    for (let n = 0; n < cantidadCajeros; n++) {
      suma += Math.pow(tasaLlegadaClientes / tasaAtencionPorCajero, n) / factorial(n);
    }
    const parteFinal = Math.pow(tasaLlegadaClientes / tasaAtencionPorCajero, cantidadCajeros) /
      (factorial(cantidadCajeros) * (1 - tasaUtilizacionSistema));
    return 1 / (suma + parteFinal);
  }

  const probabilidadSistemaVacio = calcularProbabilidadSistemaVacio();

  // Fórmula: Lq = P₀ * (λ/μ)^m * ρ / (m! * (1 - ρ)^2)
  const clientesPromedioEnCola = (probabilidadSistemaVacio *
    Math.pow(tasaLlegadaClientes / tasaAtencionPorCajero, cantidadCajeros) *
    tasaUtilizacionSistema) / (factorial(cantidadCajeros) * Math.pow(1 - tasaUtilizacionSistema, 2));

  // Fórmula: L = Lq + λ/μ
  const clientesPromedioEnSistema = clientesPromedioEnCola + tasaLlegadaClientes / tasaAtencionPorCajero;

  // Fórmula: Wq = Lq / λ
  const tiempoPromedioEnCola = clientesPromedioEnCola / tasaLlegadaClientes;

  // Fórmula: W = L / λ
  const tiempoPromedioTotalEnSistema = clientesPromedioEnSistema / tasaLlegadaClientes;

  // Costos y utilidades
  const costoTotalEspera = clientesPromedioEnCola * costoEsperaPorClientePorHora * horasTrabajoDiario;
  const costoTotalCajeros = cantidadCajeros * costoPorCajeroPorHora * horasTrabajoDiario;
  const costoTotalDelSistema = costoTotalEspera + costoTotalCajeros;

  const gananciaNetaPorCliente = ticketPromedioPorCliente * margenGananciaPorVenta;
  const cantidadClientesAtendidosPorDia = tasaLlegadaClientes * horasTrabajoDiario;
  const ingresosTotalesDiarios = gananciaNetaPorCliente * cantidadClientesAtendidosPorDia;
  const utilidadNetaDiaria = ingresosTotalesDiarios - costoTotalDelSistema;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Modelo M/M/m - Evaluación Económica del Sistema de Cajeros</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Input label="Tasa de llegada de clientes por hora (λ)" value={tasaLlegadaClientes} setValue={setTasaLlegadaClientes} />
        <Input label="Tasa de atención por cajero por hora (μ)" value={tasaAtencionPorCajero} setValue={setTasaAtencionPorCajero} />
        <Input label="Cantidad de cajeros (m)" value={cantidadCajeros} setValue={setCantidadCajeros} />
        <Input label="Horas de operación por día" value={horasTrabajoDiario} setValue={setHorasTrabajoDiario} />
        <Input label="Costo por cajero (₡/hora)" value={costoPorCajeroPorHora} setValue={setCostoPorCajeroPorHora} />
        <Input label="Costo de espera por cliente (₡/cliente/hora)" value={costoEsperaPorClientePorHora} setValue={setCostoEsperaPorClientePorHora} />
        <Input label="Ticket promedio por cliente (₡)" value={ticketPromedioPorCliente} setValue={setTicketPromedioPorCliente} />
        <Input label="Margen de ganancia (%)" value={margenGananciaPorVenta} setValue={setMargenGananciaPorVenta} step={0.01} />
      </div>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Fórmulas Clave del Modelo M/M/m</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaCard
            title="Tasa de utilización (ρ)"
            formula="ρ = λ / (m * μ)"
            description="Proporción de tiempo que los servidores están ocupados"
          />
          <FormulaCard
            title="Probabilidad sistema vacío (P₀)"
            formula="P₀ = [Σ (λ/μ)^n/n! + (λ/μ)^m/(m!(1-ρ))]⁻¹"
            description="Probabilidad de que no haya clientes en el sistema"
          />
          <FormulaCard
            title="Clientes en cola (Lq)"
            formula="Lq = P₀ * (λ/μ)^m * ρ / (m! * (1-ρ)²)"
            description="Número promedio de clientes esperando en la cola"
          />
          <FormulaCard
            title="Clientes en sistema (L)"
            formula="L = Lq + λ/μ"
            description="Número promedio de clientes en todo el sistema"
          />
          <FormulaCard
            title="Tiempo en cola (Wq)"
            formula="Wq = Lq / λ"
            description="Tiempo promedio que un cliente espera en la cola"
          />
          <FormulaCard
            title="Tiempo en sistema (W)"
            formula="W = L / λ = Wq + 1/μ"
            description="Tiempo total promedio que un cliente pasa en el sistema"
          />
        </div>
      </div>

      <div className="overflow-auto border rounded-lg mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Parámetro</th>
              <th className="p-2">Fórmula</th>
              <th className="p-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            <TableRow
              label="Porcentaje de utilización del sistema (ρ)"
              formula="λ / (m * μ)"
              value={tasaUtilizacionSistema.toFixed(4)}
            />
            <TableRow
              label="Probabilidad de sistema vacío (P₀)"
              formula="[Σ (λ/μ)^n/n! + (λ/μ)^m/(m!(1-ρ))]⁻¹"
              value={probabilidadSistemaVacio.toFixed(4)}
            />
            <TableRow
              label="Clientes promedio esperando en cola (Lq)"
              formula="P₀ * (λ/μ)^m * ρ / (m! * (1-ρ)²)"
              value={clientesPromedioEnCola.toFixed(4)}
            />
            <TableRow
              label="Clientes promedio en el sistema (L)"
              formula="Lq + λ/μ"
              value={clientesPromedioEnSistema.toFixed(4)}
            />
            <TableRow
              label="Tiempo promedio en cola (Wq)"
              formula="Lq / λ"
              value={`${tiempoPromedioEnCola.toFixed(4)} horas (${(tiempoPromedioEnCola * 60).toFixed(2)} min)`}
            />
            <TableRow
              label="Tiempo total promedio en sistema (W)"
              formula="L / λ"
              value={`${tiempoPromedioTotalEnSistema.toFixed(4)} horas (${(tiempoPromedioTotalEnSistema * 60).toFixed(2)} min)`}
            />
            <TableRow
              label="Costo total por espera diario"
              formula="Lq * CostoEspera * Horas"
              value={`₡${costoTotalEspera.toFixed(2)}`}
            />
            <TableRow
              label="Costo total por cajeros diario"
              formula="m * CostoCajero * Horas"
              value={`₡${costoTotalCajeros.toFixed(2)}`}
            />
            <TableRow
              label="Costo total diario del sistema"
              formula="CostoEspera + CostoCajeros"
              value={`₡${costoTotalDelSistema.toFixed(2)}`}
              bold
            />
            <TableRow
              label="Ingresos netos diarios estimados"
              formula="λ * Horas * Ticket * Margen"
              value={`₡${ingresosTotalesDiarios.toFixed(2)}`}
            />
            <TableRow
              label="Utilidad neta diaria"
              formula="Ingresos - CostoTotal"
              value={`₡${utilidadNetaDiaria.toFixed(2)}`}
              highlight
            />
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-bold mb-2">Resumen de Costos Diarios</h3>
          <div className="h-64">
            <CostBreakdownChart
              costos={[
                { name: 'Costo por espera', value: costoTotalEspera },
                { name: 'Costo por cajeros', value: costoTotalCajeros }
              ]}
              total={costoTotalDelSistema}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-bold mb-2">Balance Diario</h3>
          <div className="h-64">
            <ProfitChart
              ingresos={ingresosTotalesDiarios}
              costos={costoTotalDelSistema}
              utilidad={utilidadNetaDiaria}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, setValue, step = 1 }: { label: string; value: number; setValue: (v: number) => void; step?: number }) {
  return (
    <label className="space-y-1">
      <span className="block font-medium text-sm">{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        onChange={e => setValue(+e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />
    </label>
  );
}

function FormulaCard({ title, formula, description }: { title: string; formula: string; description: string }) {
  return (
    <div className="bg-white p-3 rounded border border-gray-200">
      <h4 className="font-semibold text-blue-700">{title}</h4>
      <div className="my-2 p-2 bg-gray-100 font-mono text-sm overflow-x-auto">{formula}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function TableRow({ label, formula, value, bold = false, highlight = false }:
  { label: string; formula: string; value: string; bold?: boolean; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-green-50" : undefined}>
      <td className={`p-2 ${bold ? "font-semibold" : ""}`}>{label}</td>
      <td className={`p-2 font-mono text-xs ${bold ? "font-semibold" : ""}`}>{formula}</td>
      <td className={`p-2 ${bold ? "font-semibold" : ""}`}>{value}</td>
    </tr>
  );
}

// Componentes de gráficos (simulados - en una implementación real usarías una librería como Chart.js)
function CostBreakdownChart({ costos, total }: { costos: { name: string, value: number }[]; total: number }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-end space-x-2">
        {costos.map((costo, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-400 hover:bg-blue-500 transition-colors"
              style={{ height: `${(costo.value / total) * 100}%` }}
            ></div>
            <span className="text-xs mt-1">{costo.name}</span>
            <span className="text-xs font-semibold">₡{costo.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center font-semibold border-t pt-2">
        Total: ₡{total.toFixed(2)}
      </div>
    </div>
  );
}

function ProfitChart({ ingresos, costos, utilidad }: { ingresos: number; costos: number; utilidad: number }) {
  const total = Math.max(ingresos, costos);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-end space-x-4 px-4">
        <div className="flex-1 flex flex-col items-center">
          <div
            className="w-1/2 bg-green-400"
            style={{ height: `${(ingresos / total) * 100}%` }}
          ></div>
          <span className="text-xs mt-1">Ingresos</span>
          <span className="text-xs font-semibold">₡{ingresos.toFixed(2)}</span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div
            className="w-1/2 bg-red-400"
            style={{ height: `${(costos / total) * 100}%` }}
          ></div>
          <span className="text-xs mt-1">Costos</span>
          <span className="text-xs font-semibold">₡{costos.toFixed(2)}</span>
        </div>
      </div>
      <div className={`mt-4 text-center font-semibold border-t pt-2 ${utilidad >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        Utilidad: ₡{utilidad.toFixed(2)}
      </div>
    </div>
  );
}