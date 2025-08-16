class DinosaurGame {
  constructor() {
    this.dinosaur = document.getElementById("dinosaur");
    this.gameContainer = document.getElementById("gameContainer");
    this.scoreElement = document.getElementById("score");
    this.gameOverElement = document.getElementById("gameOver");
    this.finalScoreElement = document.getElementById("finalScore");
    
    this.createDinosaurFeet();

    this.isJumping = false;
    this.isGameRunning = false;
    this.score = 0;
    this.gameSpeed = 6;
    this.obstacles = [];
    this.clouds = [];

    this.dinosaurBottom = 100;
    this.jumpHeight = 150;
    this.gravity = 0.5;
    this.jumpSpeed = 0;
    
    this.scoreTimer = null;
    this.obstacleTimer = null;

    this.init();
  }

  createDinosaurFeet() {
    const leftFoot = document.createElement('div');
    leftFoot.className = 'foot left';
    this.dinosaur.appendChild(leftFoot);
    
    const rightFoot = document.createElement('div');
    rightFoot.className = 'foot right';
    this.dinosaur.appendChild(rightFoot);
  }

  init() {
    this.addEventListeners();
    this.startGame();
    this.createClouds();
  }

  addEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (this.isGameRunning) {
          this.jump();
        }
      } else if (e.code === "Enter" || e.key === "Enter") {
        e.preventDefault();
        if (!this.isGameRunning) {
          this.restartGame();
        }
      }
    });
    
    // Also listen for keyup to handle potential issues
    document.addEventListener("keyup", (e) => {
      if (e.code === "Space" || e.key === " " || e.code === "Enter" || e.key === "Enter") {
        e.preventDefault();
      }
    });
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.jumpSpeed = 15;
    }
  }

  updateDinosaur() {
    if (this.isJumping) {
      this.dinosaurBottom += this.jumpSpeed;
      this.jumpSpeed -= this.gravity;

      // Only land if we're falling (negative jumpSpeed) AND at ground level
      if (this.dinosaurBottom <= 100 && this.jumpSpeed < 0) {
        this.dinosaurBottom = 100;
        this.isJumping = false;
        this.jumpSpeed = 0;
      }

      this.dinosaur.style.bottom = this.dinosaurBottom + "px";
    }
  }

  createObstacle() {
    const obstacle = document.createElement("div");
    
    // Randomly choose between round tree and pine tree
    if (Math.random() < 0.5) {
      obstacle.className = "obstacle";
    } else {
      obstacle.className = "obstacle pine";
    }
    
    obstacle.style.right = "-30px";
    obstacle.style.height = Math.random() * 60 + 40 + "px";
    this.gameContainer.appendChild(obstacle);
    this.obstacles.push(obstacle);
  }

  createClouds() {
    for (let i = 0; i < 5; i++) {
      this.createCloud();
    }
  }

  createCloud() {
    const cloud = document.createElement("div");
    cloud.className = "cloud";
    cloud.style.width = Math.random() * 80 + 60 + "px";
    cloud.style.height = Math.random() * 40 + 30 + "px";
    cloud.style.top = Math.random() * 200 + 50 + "px";
    cloud.style.right = Math.random() * window.innerWidth + "px";

    const size1 = Math.random() * 30 + 20;
    const size2 = Math.random() * 30 + 20;

    cloud.style.setProperty("--before-width", size1 + "px");
    cloud.style.setProperty("--before-height", size1 + "px");
    cloud.style.setProperty("--after-width", size2 + "px");
    cloud.style.setProperty("--after-height", size2 + "px");

    this.gameContainer.appendChild(cloud);
    this.clouds.push(cloud);
  }

  updateObstacles() {
    this.obstacles.forEach((obstacle, index) => {
      const currentRight = parseInt(obstacle.style.right);
      obstacle.style.right = currentRight + this.gameSpeed + "px";

      if (currentRight > window.innerWidth) {
        obstacle.remove();
        this.obstacles.splice(index, 1);
      }
    });
  }

  updateClouds() {
    this.clouds.forEach((cloud, index) => {
      const currentRight = parseInt(cloud.style.right);
      cloud.style.right = currentRight + this.gameSpeed * 0.3 + "px";

      if (currentRight > window.innerWidth + 200) {
        cloud.style.right = "-200px";
        cloud.style.top = Math.random() * 200 + 50 + "px";
      }
    });
  }

  checkCollision() {
    this.obstacles.forEach((obstacle) => {
      const obstacleRect = obstacle.getBoundingClientRect();
      const dinosaurRect = this.dinosaur.getBoundingClientRect();

      // Check collision with trunk (rectangle)
      if (this.checkRectangleCollision(dinosaurRect, obstacleRect)) {
        this.gameOver();
        return;
      }

      // Check collision with foliage based on tree type
      if (obstacle.classList.contains('pine')) {
        // Pine tree: check triangle collision
        if (this.checkTriangleCollision(dinosaurRect, obstacleRect)) {
          this.gameOver();
        }
      } else {
        // Round tree: check circle collision
        if (this.checkCircleCollision(dinosaurRect, obstacleRect)) {
          this.gameOver();
        }
      }
    });
  }

  checkRectangleCollision(rect1, rect2) {
    return rect1.right > rect2.left &&
           rect1.left < rect2.right &&
           rect1.bottom > rect2.top &&
           rect1.top < rect2.bottom;
  }

  checkCircleCollision(dinosaurRect, obstacleRect) {
    // Two circles for round trees
    const circles = [
      { x: obstacleRect.left + 10 - 15, y: obstacleRect.top - 30 + 25, radius: 25 }, // Large circle
      { x: obstacleRect.left + 10 - 10, y: obstacleRect.top - 40 + 20, radius: 20 }  // Small circle
    ];

    return circles.some(circle => 
      this.checkRectangleCircleCollision(dinosaurRect, circle)
    );
  }

  checkTriangleCollision(dinosaurRect, obstacleRect) {
    // Check collision with both triangles
    const triangles = [
      // Bottom triangle
      {
        x1: obstacleRect.left + 10 - 75, y1: obstacleRect.top - 75 + 105,
        x2: obstacleRect.left + 10 + 75, y2: obstacleRect.top - 75 + 105,
        x3: obstacleRect.left + 10, y3: obstacleRect.top - 75
      },
      // Top triangle
      {
        x1: obstacleRect.left + 10 - 66, y1: obstacleRect.top - 120 + 90,
        x2: obstacleRect.left + 10 + 66, y2: obstacleRect.top - 120 + 90,
        x3: obstacleRect.left + 10, y3: obstacleRect.top - 120
      }
    ];

    return triangles.some(triangle => 
      this.checkRectangleTriangleCollision(dinosaurRect, triangle)
    );
  }

  checkRectangleCircleCollision(rect, circle) {
    // Find closest point on rectangle to circle center
    const closestX = Math.max(rect.left, Math.min(circle.x, rect.right));
    const closestY = Math.max(rect.top, Math.min(circle.y, rect.bottom));
    
    // Calculate distance from circle center to closest point
    const distanceX = circle.x - closestX;
    const distanceY = circle.y - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    
    return distanceSquared < (circle.radius * circle.radius);
  }

  checkRectangleTriangleCollision(rect, triangle) {
    // Simplified: check if any corner of rectangle is inside triangle
    const corners = [
      { x: rect.left, y: rect.top },
      { x: rect.right, y: rect.top },
      { x: rect.left, y: rect.bottom },
      { x: rect.right, y: rect.bottom }
    ];

    return corners.some(corner => 
      this.pointInTriangle(corner.x, corner.y, triangle.x1, triangle.y1, triangle.x2, triangle.y2, triangle.x3, triangle.y3)
    );
  }

  pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
    const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    if (denominator === 0) return false;

    const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denominator;
    const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denominator;
    const c = 1 - a - b;

    return a >= 0 && b >= 0 && c >= 0;
  }

  gameOver() {
    this.isGameRunning = false;
    
    // Clear timers immediately to prevent conflicts
    if (this.scoreTimer) {
      clearInterval(this.scoreTimer);
      this.scoreTimer = null;
    }
    if (this.obstacleTimer) {
      clearInterval(this.obstacleTimer);
      this.obstacleTimer = null;
    }
    
    this.finalScoreElement.textContent = this.score;
    this.gameOverElement.style.display = "block";
  }

  restartGame() {
    // Clear existing timers
    if (this.scoreTimer) {
      clearInterval(this.scoreTimer);
      this.scoreTimer = null;
    }
    if (this.obstacleTimer) {
      clearInterval(this.obstacleTimer);
      this.obstacleTimer = null;
    }
    
    this.obstacles.forEach((obstacle) => obstacle.remove());
    this.obstacles = [];
    this.score = 0;
    this.gameSpeed = 6;
    this.dinosaurBottom = 100;
    this.isJumping = false;
    this.jumpSpeed = 0;
    this.dinosaur.style.bottom = "100px";
    this.scoreElement.textContent = "Score: 0";
    this.gameOverElement.style.display = "none";
    this.startGame();
  }

  startGame() {
    this.isGameRunning = true;
    this.gameLoop();

    // Score timer - increase score every second
    this.scoreTimer = setInterval(() => {
      if (this.isGameRunning) {
        this.score += 1;
        this.scoreElement.textContent = `Score: ${this.score}`;
        
        // Increase game speed every 10 seconds
        if (this.score % 10 === 0) {
          this.gameSpeed += 0.5;
        }
      }
    }, 1000);

    // Obstacle creation timer
    this.obstacleTimer = setInterval(() => {
      if (this.isGameRunning && Math.random() < 0.1) {
        this.createObstacle();
      }
    }, 100);
  }

  gameLoop() {
    if (!this.isGameRunning) {
      return;
    }

    this.updateDinosaur();
    this.updateObstacles();
    this.updateClouds();
    this.checkCollision();

    requestAnimationFrame(() => this.gameLoop());
  }
}

window.addEventListener("load", () => {
  new DinosaurGame();
});
