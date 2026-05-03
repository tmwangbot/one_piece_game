const characters = [
  {
    id: "luffy",
    name: "路飞",
    mark: "路",
    className: "luffy",
    maxHp: 126,
    intro: "草帽船长，擅长爆发和震慑，用橡胶拳头一路开路。",
    skills: [
      {
        name: "橡胶手枪",
        desc: "造成 24 点伤害，无冷却。",
        cooldown: 0,
        effect: { damage: 24 },
      },
      {
        name: "二档爆发",
        desc: "造成 38 点伤害，并获得 8 点护盾，冷却 3 回合。",
        cooldown: 3,
        effect: { damage: 38, shield: 8 },
      },
      {
        name: "霸王色震慑",
        desc: "造成 18 点伤害，并跳过敌方行动，冷却 4 回合。",
        cooldown: 4,
        effect: { damage: 18, stun: true },
      },
    ],
  },
  {
    id: "zoro",
    name: "索隆",
    mark: "索",
    className: "zoro",
    maxHp: 118,
    intro: "三刀流剑士，稳定输出强，关键时刻能打出极高斩击。",
    skills: [
      {
        name: "三刀流斩击",
        desc: "造成 27 点伤害，无冷却。",
        cooldown: 0,
        effect: { damage: 27 },
      },
      {
        name: "鬼斩",
        desc: "造成 33 点伤害，降低本回合反击 6 点，冷却 2 回合。",
        cooldown: 2,
        effect: { damage: 33, guard: 6 },
      },
      {
        name: "阿修罗一闪",
        desc: "造成 52 点伤害，冷却 4 回合。",
        cooldown: 4,
        effect: { damage: 52 },
      },
    ],
  },
  {
    id: "nami",
    name: "娜美",
    mark: "娜",
    className: "nami",
    maxHp: 105,
    intro: "航海士，用天候棒制造战术优势，擅长控制和爆发雷击。",
    skills: [
      {
        name: "天候棒电击",
        desc: "造成 23 点伤害，无冷却。",
        cooldown: 0,
        effect: { damage: 23 },
      },
      {
        name: "幻象云",
        desc: "造成 12 点伤害，并跳过敌方行动，冷却 3 回合。",
        cooldown: 3,
        effect: { damage: 12, stun: true },
      },
      {
        name: "雷云爆发",
        desc: "造成 45 点伤害，冷却 4 回合。",
        cooldown: 4,
        effect: { damage: 45 },
      },
    ],
  },
  {
    id: "sanji",
    name: "山治",
    mark: "山",
    className: "sanji",
    maxHp: 114,
    intro: "黑足厨师，兼具连击、火焰踢技和恢复能力。",
    skills: [
      {
        name: "恶魔风脚",
        desc: "造成 31 点伤害，冷却 2 回合。",
        cooldown: 2,
        effect: { damage: 31 },
      },
      {
        name: "连环踢",
        desc: "造成 24 点伤害，获得 5 点护盾，无冷却。",
        cooldown: 0,
        effect: { damage: 24, shield: 5 },
      },
      {
        name: "料理回复",
        desc: "回复 28 点生命，并造成 10 点伤害，冷却 4 回合。",
        cooldown: 4,
        effect: { damage: 10, heal: 28 },
      },
    ],
  },
];

const stages = [
  {
    name: "东海出航",
    story: "从谢尔兹镇到橘子镇，第一段航线需要冲破海军与海贼的围堵。",
    enemy: "东海霸主",
    mark: "东",
    sceneClass: "east",
    hp: 84,
    attack: [12, 18],
  },
  {
    name: "阿拉巴斯坦",
    story: "沙漠王国风暴逼近，必须在热浪中击溃阴谋的核心。",
    enemy: "沙漠阴谋家",
    mark: "沙",
    sceneClass: "alabasta",
    hp: 108,
    attack: [15, 22],
  },
  {
    name: "空岛试炼",
    story: "云海之上，雷鸣和试炼挡在前方，勇气是唯一的航标。",
    enemy: "空岛神官",
    mark: "雷",
    sceneClass: "skypiea",
    hp: 122,
    attack: [18, 24],
  },
  {
    name: "司法岛",
    story: "为了伙伴向世界宣战，突破机关、铁门与最强守卫。",
    enemy: "司法岛守卫",
    mark: "法",
    sceneClass: "enies",
    hp: 142,
    attack: [20, 28],
  },
  {
    name: "顶上战争",
    story: "风暴席卷海湾，最后的闯关是意志、生命和信念的碰撞。",
    enemy: "海军本部强敌",
    mark: "战",
    sceneClass: "marineford",
    hp: 166,
    attack: [23, 32],
  },
];

const state = {
  character: null,
  stageIndex: 0,
  playerHp: 0,
  shield: 0,
  enemyHp: 0,
  cooldowns: [],
  round: 1,
  usedSkills: 0,
  defeated: 0,
  locked: false,
};

const els = {
  heroScreen: document.querySelector("#heroScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  characterGrid: document.querySelector("#characterGrid"),
  stageNumber: document.querySelector("#stageNumber"),
  stageName: document.querySelector("#stageName"),
  stageStory: document.querySelector("#stageStory"),
  roundCount: document.querySelector("#roundCount"),
  playerPanel: document.querySelector("#playerPanel"),
  enemyPanel: document.querySelector("#enemyPanel"),
  playerAvatar: document.querySelector("#playerAvatar"),
  enemyAvatar: document.querySelector("#enemyAvatar"),
  playerName: document.querySelector("#playerName"),
  enemyName: document.querySelector("#enemyName"),
  playerHpText: document.querySelector("#playerHpText"),
  enemyHpText: document.querySelector("#enemyHpText"),
  playerHpBar: document.querySelector("#playerHpBar"),
  enemyHpBar: document.querySelector("#enemyHpBar"),
  playerStatus: document.querySelector("#playerStatus"),
  enemyStatus: document.querySelector("#enemyStatus"),
  skillGrid: document.querySelector("#skillGrid"),
  turnHint: document.querySelector("#turnHint"),
  battleLog: document.querySelector("#battleLog"),
  resultKicker: document.querySelector("#resultKicker"),
  resultTitle: document.querySelector("#resultTitle"),
  resultCopy: document.querySelector("#resultCopy"),
  resultStats: document.querySelector("#resultStats"),
  nextStage: document.querySelector("#nextStage"),
  retryStage: document.querySelector("#retryStage"),
  resultSelect: document.querySelector("#resultSelect"),
  backToSelect: document.querySelector("#backToSelect"),
  sceneStage: document.querySelector("#sceneStage"),
  sceneLandmark: document.querySelector("#sceneLandmark"),
  sceneCaption: document.querySelector("#sceneCaption"),
  playerSprite: document.querySelector("#playerSprite"),
  enemySprite: document.querySelector("#enemySprite"),
  effectLayer: document.querySelector("#effectLayer"),
};

function init() {
  renderCharacters();
  bindControls();
  showScreen("hero");
}

function renderCharacters() {
  els.characterGrid.innerHTML = characters
    .map(
      (character) => `
        <button class="character-card" type="button" data-character="${character.id}">
          <div class="character-preview">${renderSprite(character.id, character.name, false)}</div>
          <h2>${character.name}</h2>
          <p>${character.intro}</p>
          <div class="skill-tags">
            ${character.skills.map((skill) => `<span>${skill.name}</span>`).join("")}
          </div>
        </button>
      `,
    )
    .join("");

  els.characterGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const character = characters.find((item) => item.id === button.dataset.character);
      startRun(character);
    });
  });
}

function bindControls() {
  els.backToSelect.addEventListener("click", () => showScreen("hero"));
  els.resultSelect.addEventListener("click", () => showScreen("hero"));
  els.retryStage.addEventListener("click", () => startStage(state.stageIndex, false));
  els.nextStage.addEventListener("click", () => {
    if (state.stageIndex >= stages.length - 1) {
      showScreen("hero");
      return;
    }
    startStage(state.stageIndex + 1, true);
  });
}

function startRun(character) {
  state.character = character;
  state.stageIndex = 0;
  state.playerHp = character.maxHp;
  state.shield = 0;
  state.usedSkills = 0;
  state.defeated = 0;
  startStage(0, false);
}

function startStage(stageIndex, keepHp) {
  const stage = stages[stageIndex];
  state.stageIndex = stageIndex;
  state.enemyHp = stage.hp;
  state.cooldowns = state.character.skills.map(() => 0);
  state.round = 1;
  state.shield = 0;
  state.locked = false;
  if (!keepHp) {
    state.playerHp = state.character.maxHp;
  } else {
    state.playerHp = Math.min(state.character.maxHp, state.playerHp + 16);
  }

  els.battleLog.innerHTML = "";
  addLog(`${stage.name} 开始，${stage.enemy} 挡在航线前方。`);
  showScreen("game");
  renderBattle();
}

function showScreen(name) {
  els.heroScreen.classList.toggle("screen-active", name === "hero");
  els.gameScreen.classList.toggle("screen-active", name === "game");
  els.resultScreen.classList.toggle("screen-active", name === "result");
}

function renderBattle() {
  const stage = stages[state.stageIndex];
  const character = state.character;
  const playerHpPercent = Math.max(0, (state.playerHp / character.maxHp) * 100);
  const enemyHpPercent = Math.max(0, (state.enemyHp / stage.hp) * 100);

  els.stageNumber.textContent = `Stage ${state.stageIndex + 1} / ${stages.length}`;
  els.stageName.textContent = stage.name;
  els.stageStory.textContent = stage.story;
  els.roundCount.textContent = state.round;
  els.playerAvatar.textContent = character.mark;
  els.playerAvatar.className = `fighter-art ${character.className}`;
  els.enemyAvatar.textContent = stage.mark;
  els.enemyAvatar.className = "fighter-art enemy-art enemy-theme";
  els.sceneStage.className = `scene-stage ${stage.sceneClass}`;
  els.sceneCaption.textContent = `${stage.name} · ${stage.enemy}`;
  els.sceneLandmark.setAttribute("aria-label", stage.name);
  els.playerSprite.innerHTML = renderSprite(character.id, character.name, false);
  els.enemySprite.innerHTML = renderSprite("enemy", stage.enemy, true);
  els.playerName.textContent = character.name;
  els.enemyName.textContent = stage.enemy;
  els.playerHpText.textContent = `${state.playerHp}/${character.maxHp}`;
  els.enemyHpText.textContent = `${state.enemyHp}/${stage.hp}`;
  els.playerHpBar.style.width = `${playerHpPercent}%`;
  els.enemyHpBar.style.width = `${enemyHpPercent}%`;
  els.playerStatus.textContent = state.shield > 0 ? `护盾 ${state.shield}` : "准备行动";
  els.enemyStatus.textContent = state.enemyHp > 0 ? "正在防守" : "已击败";

  renderSkills();
}

function renderSkills() {
  els.skillGrid.innerHTML = state.character.skills
    .map((skill, index) => {
      const cooldown = state.cooldowns[index];
      const disabled = cooldown > 0 || state.locked;
      return `
        <button class="skill-button" type="button" data-skill="${index}" ${disabled ? "disabled" : ""}>
          <strong>${skill.name}</strong>
          <span>${skill.desc}</span>
          ${cooldown > 0 ? `<span class="cooldown">冷却 ${cooldown} 回合</span>` : ""}
        </button>
      `;
    })
    .join("");

  els.skillGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => useSkill(Number(button.dataset.skill)));
  });
}

function useSkill(index) {
  if (state.locked || state.cooldowns[index] > 0) return;

  state.locked = true;
  const skill = state.character.skills[index];
  const effect = skill.effect;
  state.usedSkills += 1;
  state.cooldowns[index] = skill.cooldown > 0 ? skill.cooldown + 1 : 0;

  animate(els.playerPanel, "strike");
  animate(els.playerSprite, "strike");

  const damage = effect.damage || 0;
  state.enemyHp = Math.max(0, state.enemyHp - damage);
  if (damage > 0) {
    animate(els.enemyPanel, "shake");
    animate(els.enemySprite, "shake");
    showEffect(effect.stun ? "burst" : "slash", "enemy", damage, effect);
  }

  if (effect.heal) {
    state.playerHp = Math.min(state.character.maxHp, state.playerHp + effect.heal);
    animate(els.playerPanel, "heal");
    animate(els.playerSprite, "heal");
    showEffect("heal", "player", effect.heal, effect);
  }

  if (effect.shield) {
    state.shield += effect.shield;
    showEffect("shield", "player", effect.shield, effect);
  }

  addLog(`${state.character.name} 使用 ${skill.name}，造成 ${damage} 点伤害。${extraEffectText(effect)}`);
  renderBattle();

  if (state.enemyHp <= 0) {
    setTimeout(stageClear, 450);
    return;
  }

  if (effect.stun) {
    animate(els.enemyPanel, "stun");
    animate(els.enemySprite, "stun");
    addLog(`${stages[state.stageIndex].enemy} 被震慑，本回合无法反击。`);
    endRound();
    return;
  }

  setTimeout(() => enemyTurn(effect.guard || 0), 520);
}

function extraEffectText(effect) {
  const notes = [];
  if (effect.heal) notes.push(`回复 ${effect.heal} 点生命`);
  if (effect.shield) notes.push(`获得 ${effect.shield} 点护盾`);
  if (effect.guard) notes.push(`削弱反击 ${effect.guard} 点`);
  if (effect.stun) notes.push("压制敌方行动");
  return notes.length ? ` ${notes.join("，")}。` : "";
}

function enemyTurn(guard) {
  const stage = stages[state.stageIndex];
  const rawDamage = randomInt(stage.attack[0], stage.attack[1]);
  const guardedDamage = Math.max(0, rawDamage - guard);
  const absorbed = Math.min(state.shield, guardedDamage);
  const finalDamage = guardedDamage - absorbed;

  state.shield -= absorbed;
  state.playerHp = Math.max(0, state.playerHp - finalDamage);
  animate(els.playerPanel, "shake");
  animate(els.enemySprite, "strike");
  animate(els.playerSprite, "shake");
  showEffect("burst", "player", finalDamage, { enemy: true });
  addLog(`${stage.enemy} 反击，造成 ${finalDamage} 点伤害。${absorbed > 0 ? `护盾抵消 ${absorbed} 点。` : ""}`);
  renderBattle();

  if (state.playerHp <= 0) {
    setTimeout(stageFailed, 450);
    return;
  }

  endRound();
}

function endRound() {
  state.cooldowns = state.cooldowns.map((value) => Math.max(0, value - 1));
  state.round += 1;
  state.locked = false;
  renderBattle();
}

function stageClear() {
  state.defeated += 1;
  const isFinal = state.stageIndex === stages.length - 1;
  showResult({
    win: true,
    title: isFinal ? "抵达航线终点" : "关卡突破",
    copy: isFinal
      ? "伙伴的旗帜穿过风暴，伟大航路的传说又添上了新的一页。"
      : `${stages[state.stageIndex].name} 已突破，短暂修整后继续向下一片海域前进。`,
    final: isFinal,
  });
}

function stageFailed() {
  showResult({
    win: false,
    title: "航线受阻",
    copy: `${stages[state.stageIndex].enemy} 暂时挡住了去路，调整技能节奏后再挑战一次。`,
    final: false,
  });
}

function showResult(result) {
  els.resultKicker.textContent = result.win ? "Victory" : "Defeat";
  els.resultTitle.textContent = result.title;
  els.resultCopy.textContent = result.copy;
  els.nextStage.textContent = result.final ? "重新开始" : "进入下一关";
  els.nextStage.style.display = result.win ? "inline-block" : "none";
  els.retryStage.style.display = result.final ? "none" : "inline-block";

  els.resultStats.innerHTML = `
    <div class="stat-card"><span>角色</span><strong>${state.character.name}</strong></div>
    <div class="stat-card"><span>剩余生命</span><strong>${state.playerHp}</strong></div>
    <div class="stat-card"><span>技能次数</span><strong>${state.usedSkills}</strong></div>
    <div class="stat-card"><span>击败敌人</span><strong>${state.defeated}</strong></div>
    <div class="stat-card"><span>当前关卡</span><strong>${state.stageIndex + 1}</strong></div>
    <div class="stat-card"><span>回合</span><strong>${state.round}</strong></div>
  `;

  showScreen("result");
}

function addLog(message) {
  const item = document.createElement("li");
  item.textContent = message;
  els.battleLog.prepend(item);
}

function renderSprite(id, label, enemy) {
  const propMarkup =
    id === "zoro"
      ? '<div class="sprite-prop prop-one"></div><div class="sprite-prop prop-two"></div><div class="sprite-prop prop-three"></div>'
      : id === "nami" || id === "enemy"
        ? '<div class="sprite-prop prop-one"></div>'
        : "";
  return `
    <div class="game-sprite ${id}-figure ${enemy ? "enemy" : ""}" aria-label="${label}">
      <div class="sprite-shadow"></div>
      <div class="sprite-head"><div class="sprite-face"></div></div>
      <div class="sprite-body"></div>
      <div class="sprite-arm arm-left"></div>
      <div class="sprite-arm arm-right"></div>
      <div class="sprite-leg leg-left"></div>
      <div class="sprite-leg leg-right"></div>
      ${propMarkup}
      <div class="sprite-nameplate">${label}</div>
    </div>
  `;
}

function showEffect(type, target, value, effect) {
  const color = effect.heal
    ? "#38a169"
    : effect.shield
      ? "#2b6cb0"
      : effect.stun
        ? "#7b3fe4"
        : effect.enemy
          ? "#e84d3d"
          : "#ffcc4d";
  const x = target === "enemy" ? "75%" : "25%";
  const y = target === "enemy" ? "50%" : "50%";
  const main = document.createElement("div");
  main.className = type === "slash" ? "effect-slash" : "effect-burst";
  main.style.setProperty("--x", x);
  main.style.setProperty("--y", y);
  main.style.setProperty("--effect-color", color);
  els.effectLayer.appendChild(main);

  const float = document.createElement("div");
  float.className = "effect-float";
  float.style.setProperty("--x", x);
  float.style.setProperty("--y", "37%");
  float.style.setProperty("--effect-color", color);
  float.textContent = effect.heal ? `+${value}` : effect.shield ? `盾 +${value}` : `-${value}`;
  els.effectLayer.appendChild(float);

  setTimeout(() => {
    main.remove();
    float.remove();
  }, 900);
}

function animate(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();
