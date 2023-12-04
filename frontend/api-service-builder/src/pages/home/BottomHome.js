import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function BottomHome() {
	const UserCard = ({ name, role, facebook, line, instagram, imageSrc }) => (
		<div className="p-5 shadow-md bg-white rounded-md w-96">
			<div className="flex gap-x-8 leading-relaxed items-center">
				<img
					src={imageSrc}
					alt=""
					className="rounded-full w-1/5 h-24 w-24 object-cover"
				/>
				<div className="group">
					<div className="text-lg font-bold">{name}</div>
					<div className="text-md text-gray-500">{role}</div>
					<div className="social-media flex gap-x-3 text-xl mt-3">
						<FontAwesomeIcon
							icon={icon({
								name: "facebook",
								style: "brands",
							})}
							className="text-blue-500"
						/>
						<FontAwesomeIcon
							icon={icon({
								name: "line",
								style: "brands",
							})}
							className="text-lime-600"
						/>
						<FontAwesomeIcon
							icon={icon({
								name: "instagram",
								style: "brands",
							})}
							className="text-pink-500 text-xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<div className="text-center mt-14 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center gap-28 mt-36 mb-24">
					<div className="group flex flex-col w-1/5 h-full">
						<img src="assets/images/home-icon-1.png" alt="" />
						<div className="text-md mt-10">
							Users no longer need to write complex traditional
							APIs.
						</div>
					</div>
					<div className="group flex flex-col w-1/5 h-full">
						<img src="assets/images/home-icon-2.png" alt="" />
						<div className="text-md mt-10">
							Assist users in front-end learning without extensive
							back-end study.
						</div>
					</div>
					<div className="group flex flex-col w-1/5 h-full">
						<img src="assets/images/home-icon-3.png" alt="" />
						<div className="text-md mt-10">
							The system provides databases, APIs, and service
							hosts, not just API creation.
						</div>
					</div>
				</div>
			</div>
			<div className="main-background pt-0.5">
				<div className="mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-20 mb-5">
					<div className="flex gap-x-10">
						<div className="flex-1">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900">
								Hello. How can we help?
							</h1>
							<h1 className="text-lg text-gray-700 mt-3">
								Contact us if you have any questions.
							</h1>
							<div className="list flex flex-col gap-y-5 mt-10">
								<UserCard
									name="Mr. Phongphiphat Senta"
									role="KMITL Student"
									facebook="facebook.com/example"
									line="line-id"
									instagram="instagram.com/example"
									imageSrc="https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/278663030_4762219520556775_8559442619907004717_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGRlABErbfg4SzcNsNwBXGZ2RtBTCOQiurZG0FMI5CK6lTlxTQMbzbgUJTJ8b9QUyF5jTDCCDzOH-gPA5r1RQVe&_nc_ohc=z8VtyrzmgqAAX8GSZUs&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfBD26gg1BKxg558iifs2yqhR_Zk-nN8I22UfWdFLM6z8w&oe=65723EB5"
								/>
								<UserCard
									name="Mr.Kotcharat Puttated"
									role="KMITL Student"
									facebook="facebook.com/example"
									line="line-id"
									instagram="instagram.com/example"
									imageSrc="https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/256107004_6450269478378744_8117981366382383609_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeHQS4EQIeIyG_5udo7qizywjICrFJyPDuWMgKsUnI8O5cCEfiMz8gLOJJfRN_D2EHrQHLZ31tiMW_vGxe6rZe6R&_nc_ohc=zgQMzw8KxmkAX_Ps9kr&_nc_ht=scontent.fbkk8-2.fna&oh=00_AfCH_CfwDljlREeyiNy7C2WkDP-tR864iwsIRypF1WuUCg&oe=657269BA"
								/>
								<UserCard
									name="Mr.Chidnupong Boonma"
									role="KMITL Student"
									facebook="facebook.com/example"
									line="line-id"
									instagram="instagram.com/example"
									imageSrc="https://scontent.fbkk8-2.fna.fbcdn.net/v/t39.30808-6/349309791_1310871766452161_4347908451330991787_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9c7eae&_nc_eui2=AeG-1h3AnXbi989CgMwTQ4oMoEaPQ_q29JygRo9D-rb0nMfXwF-BxL6tDu8Hr0n4yf2R25OIJx-eukIomX872Vg4&_nc_ohc=KktXK1EwXeMAX9_socF&_nc_ht=scontent.fbkk8-2.fna&oh=00_AfApOUPUtyvZcSY4G6ezv7yi2g0CO8925_BzeEzzQb--fA&oe=65720EF5"
								/>
							</div>
						</div>
						<div className="flex-1 flex flex-col gap-y-3">
							<div className="flex gap-x-8 mt-12">
								<div className="flex-1">
									<label
										for="first_name"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										First name
									</label>
									<input
										type="text"
										id="first_name"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="John"
										required
									/>
								</div>
								<div className="flex-1">
									<label
										for="last_name"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										Last name
									</label>
									<input
										type="text"
										id="last_name"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="Smith"
										required
									/>
								</div>
							</div>
							<div className="flex gap-x-8">
								<div className="flex-1">
									<label
										for="email"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										Email
									</label>
									<input
										type="text"
										id="email"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="yourmail@gmail.com"
										required
									/>
								</div>
								<div className="flex-1">
									<label
										for="phone"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										Phone
									</label>
									<input
										type="text"
										id="phone"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="09x-xxx-xxxx"
										required
									/>
								</div>
							</div>
							<div className="flex">
								<div className="flex-1">
									<label
										for="topic"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										Topic
									</label>
									<input
										type="text"
										id="topic"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										required
										placeholder="Enter topic here ..."
									/>
								</div>
							</div>
							<div className="flex">
								<div className="flex-1">
									<label
										for="request"
										className="block mb-2 text-md font-medium text-gray-900"
									>
										Your Request
									</label>
									<textarea
										id="request"
										rows="5"
										className="h-100 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Tell us ..."
									></textarea>
								</div>
							</div>
							<div className="text-end mt-5">
								<button className="bg-primary-900 text-white hover:bg-primary-700 rounded-md px-5 py-2 text-lg font-medium shadow-md w-fit">
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BottomHome;
