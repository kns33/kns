import { useState } from "react";
import { DollarSign, Users, UserCheck, UserPlus, Briefcase, FileText, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	minimumFractionDigits: 2,
});

const BusinessOverviewForm = () => {
	const [form, setForm] = useState({
		lastMonthRevenue: "",
		totalClients: "",
		activeClients: "",
		lastMonthLeads: "",
		totalEmployees: "",
		companyType: "MEI",
		employees: [{ name: "", salary: "", role: "" }],
		servicePrice: "",
		clients: []
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCurrencyChange = (e) => {
		const raw = e.target.value.replace(/\D/g, "");
		const formatted = currencyFormatter.format(Number(raw) / 100);
		setForm({ ...form, [e.target.name]: formatted });
	};

	const handleEmployeeChange = (index, field, value) => {
		const updated = [...form.employees];
		updated[index][field] = field === "salary" ? currencyFormatter.format(Number(value.replace(/\D/g, "")) / 100) : value;
		setForm({ ...form, employees: updated });
	};

	const addEmployee = () => {
		setForm({ ...form, employees: [...form.employees, { name: "", salary: "", role: "" }] });
	};

	const removeEmployee = (indexToRemove) => {
		const updated = form.employees.filter((_, idx) => idx !== indexToRemove);
		setForm({ ...form, employees: updated });
	};

	const handleClientChange = (index, field, value) => {
		const updated = [...form.clients];
		updated[index][field] = value;
		setForm({ ...form, clients: updated });
	};

	const removeClient = (indexToRemove) => {
		const updated = form.clients.filter((_, idx) => idx !== indexToRemove);
		setForm({ ...form, clients: updated });
	};

	const addClient = () => {
		setForm({
			...form,
			clients: [...form.clients, {
				name: "",
				type: "MEI",
				company: "",
				email: "",
				leads: "",
				cpa: "",
				roas: "",
				conversion: "",
				monthlyFee: "",
				channel: "",
				description: "",
				duration: ""
			}]
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("📤 Dados para envio:", JSON.stringify(form, null, 2));
		alert("Dados prontos para envio. Veja no console.");
	};

	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<h2 className='text-2xl font-semibold mb-6 text-gray-100'>📋 Dados do Negócio</h2>
				<form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-100'>
					<InputField label='Faturamento Mês Passado' name='lastMonthRevenue' icon={DollarSign} value={form.lastMonthRevenue} onChange={handleCurrencyChange} />
					<InputField label='Total de Clientes' name='totalClients' icon={Users} value={form.totalClients} onChange={handleChange} />
					<InputField label='Clientes Ativos' name='activeClients' icon={UserCheck} value={form.activeClients} onChange={handleChange} />
					<InputField label='Leads Mês Passado' name='lastMonthLeads' icon={UserPlus} value={form.lastMonthLeads} onChange={handleChange} />
					<InputField label='Número de Funcionários' name='totalEmployees' icon={Briefcase} value={form.totalEmployees} onChange={handleChange} />
					<div>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Tipo de Empresa</label>
						<div className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-2'>
							<select name='companyType' value={form.companyType} onChange={handleChange} className='w-full bg-transparent text-white outline-none'>
								<option value='MEI'>MEI</option>
								<option value='Microempresa'>Microempresa</option>
								<option value='Pequena Empresa'>Pequena Empresa</option>
							</select>
						</div>
					</div>
					<InputField label='Preço do Serviço' name='servicePrice' icon={DollarSign} value={form.servicePrice} onChange={handleCurrencyChange} />
					<div className='sm:col-span-2'>
						<label className='block text-sm font-medium text-gray-300 mb-2'>Clientes</label>
						{form.clients.length > 0 && (
							<AnimatePresence>
								{form.clients.map((client, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, scale: 0.95 }}
										className='relative grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'
									>
										<button
											type='button'
											onClick={() => removeClient(index)}
											className='absolute top-0 right-0 text-red-500 hover:text-red-400'
											title='Remover cliente'
										>
											<Trash2 size={20} />
										</button>
										<InputField label='Nome' name='name' value={client.name} onChange={(e) => handleClientChange(index, 'name', e.target.value)} />
										<div>
											<label className='block text-sm font-medium text-gray-300 mb-2'>Tipo de Empresa</label>
											<div className='bg-gray-800 border border-gray-700 rounded-lg px-4 py-2'>
												<select value={client.type} onChange={(e) => handleClientChange(index, 'type', e.target.value)} className='w-full bg-transparent text-white outline-none'>
													<option value='MEI'>MEI</option>
													<option value='Microempresa'>Microempresa</option>
													<option value='Pequena Empresa'>Pequena Empresa</option>
												</select>
											</div>
										</div>
										<InputField label='Nome da Empresa' name='company' value={client.company} onChange={(e) => handleClientChange(index, 'company', e.target.value)} />
										<InputField label='Email' name='email' value={client.email} onChange={(e) => handleClientChange(index, 'email', e.target.value)} />
										<InputField label='Leads' name='leads' value={client.leads} onChange={(e) => handleClientChange(index, 'leads', e.target.value)} />
										<InputField label='CPA' name='cpa' value={client.cpa} onChange={(e) => handleClientChange(index, 'cpa', e.target.value)} />
										<InputField label='ROAS' name='roas' value={client.roas} onChange={(e) => handleClientChange(index, 'roas', e.target.value)} />
										<InputField label='Conversão' name='conversion' value={client.conversion} onChange={(e) => handleClientChange(index, 'conversion', e.target.value)} />
										<InputField label='Valor Mensal' name='monthlyFee' value={client.monthlyFee} onChange={(e) => handleClientChange(index, 'monthlyFee', e.target.value)} />
										<InputField label='Canal de Aquisição' name='channel' value={client.channel} onChange={(e) => handleClientChange(index, 'channel', e.target.value)} />
										<InputField label='Descrição do Serviço' name='description' value={client.description} onChange={(e) => handleClientChange(index, 'description', e.target.value)} />
										<InputField label='Contrato (meses)' name='duration' value={client.duration} onChange={(e) => handleClientChange(index, 'duration', e.target.value)} />
									</motion.div>
								))}
							</AnimatePresence>
						)}
						<button type='button' onClick={addClient} className='text-sm text-indigo-400 hover:underline mt-2'>+ Adicionar Cliente</button>
					</div>
					<div className='sm:col-span-2 mt-4'>
						<button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg'>📤 Enviar Dados</button>
					</div>
				</form>
			</main>
		</div>
	);
};

const InputField = ({ label, name, icon: Icon, value, onChange }) => (
	<div>
		<label className='block text-sm font-medium text-gray-300 mb-2'>{label}</label>
		<div className='flex items-center bg-gray-800 border border-gray-700 rounded-lg px-4 py-2'>
			{Icon && <Icon className='text-gray-400 w-5 h-5 mr-2' />}
			<input type='text' name={name} value={value} onChange={onChange} className='w-full bg-transparent text-white outline-none placeholder-gray-400' placeholder={label} />
		</div>
	</div>
);

export default BusinessOverviewForm;
