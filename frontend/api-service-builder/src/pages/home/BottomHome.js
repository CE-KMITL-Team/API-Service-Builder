import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function BottomHome() {
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
				<div className="mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-96 mb-24">
					<div className="flex">
						<div class="flex-1">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900">
								Hello. How can we help?
							</h1>
							<h1 className="text-lg text-gray-700 mt-3">
								Contact us if you have any questions.
							</h1>
							<div className="group relative p-5 shadow-lg bg-white rounded-md">
								<div className="flex">
									<div className="flex-1">
										<img
											src="https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/278663030_4762219520556775_8559442619907004717_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGRlABErbfg4SzcNsNwBXGZ2RtBTCOQiurZG0FMI5CK6lTlxTQMbzbgUJTJ8b9QUyF5jTDCCDzOH-gPA5r1RQVe&_nc_ohc=z8VtyrzmgqAAX8GSZUs&_nc_ht=scontent.fbkk13-1.fna&oh=00_AfBD26gg1BKxg558iifs2yqhR_Zk-nN8I22UfWdFLM6z8w&oe=65723EB5"
											alt=""
											className="rounded-full"
										/>
									</div>
									<div className="flex-1">
										<div className="text-lg font-bold">
											Mr.Phongphiphat Senta
										</div>
										<div className="text-md text-gray-500">
											KMITL Student
										</div>
										<div className="social-media">
											<FontAwesomeIcon
												icon={icon({
													name: "user-secret",
												})}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex-1">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900">
								Hello. How can we help?
							</h1>
							<h1 className="text-lg text-gray-700 mt-3">
								Contact us if you have any questions.
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BottomHome;
