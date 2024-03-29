import React from "react";

function DocumentMenu({ menu }) {
	const renderSubMenu = (submenu) => {
		if (!submenu) return null;

		return (
			<div className="sublist ml-5 mt-3 ">
				{submenu.map((item, index) => (
					<div key={index} className="items">
						<div className="text-md ml-5 relative before:absolute before:content-[''] before:bg-gray-200 before:w-0.5 before:h-full before:-left-3">
							{item.name}
						</div>
						{renderSubMenu(item.submenu)}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="list leading-loose pb-16">
			{menu.map((menuItem, index) => (
				<div key={index} className="menu">
					<div
						className={
							index === 0
								? "text-lg font-bold"
								: "text-lg font-bold mt-5"
						}
					>
						{menuItem.name}
					</div>
					<div className="sublist mt-2">
						{menuItem.submenu.map((subItem, subIndex) => (
							<div key={subIndex} className="items">
								{subIndex === 4 ? ( //🚧 Wait Fixed
									<div className="cursor-pointer text-md text-primary-900 ml-5 relative before:absolute before:content-[''] before:bg-primary-700 before:w-0.5 before:h-full before:-left-3">
										{subItem.name}
									</div>
								) : (
									<div className="cursor-pointer text-md ml-5 relative before:absolute before:content-[''] before:bg-gray-200 before:w-0.5 before:h-full before:-left-3">
										{subItem.name}
									</div>
								)}
								{renderSubMenu(subItem.submenu)}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default DocumentMenu;
