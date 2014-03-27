
	color_rooi1 = function(level){
				


				return '0x' + (function co(lor){   return (lor +=
					  [level.toString(16),level.toString(16)][1])
					  && (lor.length == 1) ?  lor : co(lor); })('') + 'b2211';
	}

	color_rooi2 = function(level){
				


				return '0x' + (function co(lor){   return (lor +=
					  [level.toString(16),level.toString(16)][1])
					  && (lor.length == 1) ?  lor : co(lor); })('') + 'b6622';
	}

	color_blou1 = function(level){
				


				return '0x' + (function co(lor){   return (lor +=
					  [level.toString(16),level.toString(16)][1])
					  && (lor.length == 4) ?  lor : co(lor); })('') + 'ff';
	}

	color_rooi2 = function(level){
				


				return '0x' + (function co(lor){   return (lor +=
					  [level.toString(16),level.toString(16)][1])
					  && (lor.length == 1) ?  lor : co(lor); })('') + 'b6622';
	}

makeJellieAndReturn = function() {


			var tower = new PIXI.DisplayObjectContainer();

			tower.health = (Math.floor(Math.random() * 1) + 1) * 10;
			console.log("tower.health: " + tower.health);

			tower.speed = Math.floor(Math.random() * 5) + 1;
			console.log("tower.speed: " + tower.speed);

			tower.shield = Math.floor(Math.random() * 5) + 1;
			console.log("tower.shield: " + tower.shield);

			tower.shielrecharge = Math.floor(Math.random() * 5) + 1;
			console.log("tower.shielrecharge: " + tower.shielrecharge);

			tower.range = ((Math.floor(Math.random() * 1) + 1) * 10) + 40;
			console.log("tower.range: " + tower.range);

			tower.reload = (Math.floor(Math.random() * 1) + 1) / 3;
			console.log("tower.reload: " + tower.reload);

			tower.damage = Math.floor(Math.random() * 1) + 1;
			console.log("tower.damage: " + tower.damage);

			tower.velx = Math.random() - Math.random();
			tower.vely = Math.random() - Math.random();

		/*	tower.turning = (Math.floor(Math.random() * 5) + 1) / 3;
			console.log("tower.reload: " + tower.turning);

			tower.energy = Math.floor(Math.random() * 5) + 1;
			console.log("tower.damage: " + tower.turning); */



			//body ----------

			var body = new PIXI.Graphics();
			var color;
			var x,y;




				for (var i = 0; i <  5; i++) {

					x = Math.floor(Math.random() * 30)-15;
					y = Math.floor(Math.random() * 30)-15;
					radius = 5;

					
					/*body.lineStyle(radius/2, color, 1);
					body.moveTo(x,y);
					body.lineTo(0,0);

					body.lineStyle(0, 0x000000, 0.0);*/



					color = color_rooi1(i+4);

					body.beginFill(color, 1);
					body.drawCircle(x, y, radius);
					body.endFill();		


					color = color_rooi1(i+5);

					body.beginFill(color, 1);
					body.drawCircle(x/2, y/2, radius*1.5);
					body.endFill();	

					body.scale.x = 1;
					body.scale.y = 1;

					
					
				}

			body.beginFill(0xFFFFFF, 0.03);
			body.drawCircle(0, 0, (1 + (tower.health/2)*2)) ;
			body.endFill();		
			
			

			// weapon ----------

			var weapon = new PIXI.Graphics();
			var color;
			var x,y;
			var angle_step;
			var radius = (tower.range);


			color = '0xFFFFFF'

			angle_step = (Math.PI * 2) / tower.damage;
			console.log((angle_step/Math.PI)*180);

			for (var i = 0; i < tower.damage; i++) {
							
					weapon.beginFill(color, 1);
					weapon.drawCircle(Math.cos(angle_step*i)*radius, Math.sin(angle_step*i)*radius, (tower.damage/2)+1);
					weapon.endFill();		


			};

			weapon.beginFill(0xFFcccc, 0.03);
			weapon.drawCircle(0, 0,  (radius)) ;
			weapon.endFill();		
			

			// main build

			tower.addChild(body);
			tower.addChild(weapon);

			tower.position.x = Math.random()*1000;
			tower.position.y = Math.random()*300;
			
			return tower;

	};

makeCrystalAndReturn = function() {


			var tower = new PIXI.DisplayObjectContainer();

			tower.health = (Math.floor(Math.random() * 1) + 1) * 10;
			console.log("tower.health: " + tower.health);

			tower.speed = Math.floor(Math.random() * 5) + 1;
			console.log("tower.speed: " + tower.speed);

			tower.shield = Math.floor(Math.random() * 5) + 1;
			console.log("tower.shield: " + tower.shield);

			tower.shielrecharge = Math.floor(Math.random() * 5) + 1;
			console.log("tower.shielrecharge: " + tower.shielrecharge);

			tower.range = ((Math.floor(Math.random() * 1) + 1) * 10) + 40;
			console.log("tower.range: " + tower.range);

			tower.reload = (Math.floor(Math.random() * 5) + 1) / 3;
			console.log("tower.reload: " + tower.reload);

			tower.damage = Math.floor(Math.random() * 1) + 1;
			console.log("tower.damage: " + tower.damage);

			tower.velx = Math.random() - Math.random();
			tower.vely = Math.random() - Math.random();
			


		/*	tower.turning = (Math.floor(Math.random() * 5) + 1) / 3;
			console.log("tower.reload: " + tower.turning);

			tower.energy = Math.floor(Math.random() * 5) + 1;
			console.log("tower.damage: " + tower.turning); */



			//body ----------

			var body = new PIXI.Graphics();
			var color;
			var x,y;
			var x1,y1,x2,y2;

			

			for (var i = 0; i <  4; i++) {


				x1 = ((Math.random()*60)-30);
				y1 = ((Math.random()*60)-30);


				x2 = ((Math.random()*60)-30);
				y2 = ((Math.random()*60)-30);

				color = color_blou1(i+7);

				body.beginFill(color, 1);	
						
					body.moveTo(x1,y1);
					body.lineTo(x2,y2);
					body.lineTo(-x1-x2,-y1-y2);
					body.lineTo(x1,y1);
						
				body.endFill();	

			};

			for (var j = 0; j <  4; j++) {

					
				radius = 5;
	

				console.log("hLLO");
				color = color_blou1(j+7);

				x = ((Math.random()*60)-30);
				y = ((Math.random()*60)-30);


				body.beginFill(color, 1);	
					
					body.moveTo(x,y);
					body.lineTo(((Math.random()*60)-30),((Math.random()*60)-30));
					body.lineTo(((Math.random()*60)-30),((Math.random()*60)-30));
					body.lineTo(x,y);
					
				body.endFill();		


					

				body.scale.x = 0.65;
				body.scale.y = 0.65;

					
					
			}

			body.beginFill(0xFFFFFF, 0.03);
			body.drawCircle(0, 0, (1 + (tower.health/2)*2)) ;
			body.endFill();		
			
			

			// weapon ----------

			var weapon = new PIXI.Graphics();
			var color;
			var x,y;
			var angle_step;
			var radius = (tower.range);


			color = '0xFFFFFF'

			angle_step = (Math.PI * 2) / tower.damage;
			console.log((angle_step/Math.PI)*180);

			for (var i = 0; i < tower.damage; i++) {
							
					weapon.beginFill(color, 1);
					weapon.drawCircle(Math.cos(angle_step*i)*radius, Math.sin(angle_step*i)*radius, (tower.damage/2)+1);
					weapon.endFill();		


			};

			weapon.beginFill(0xccccff, 0.03);
			weapon.drawCircle(0, 0,  (radius)) ;
			weapon.endFill();		
			

			// main build

			tower.addChild(body);
			tower.addChild(weapon);

			tower.position.x = Math.random()*1000;
			tower.position.y = Math.random()*300;
			
			return tower;

	};	