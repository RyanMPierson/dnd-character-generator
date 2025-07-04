// JavaScript code for the Dungeons and Dragons character generator

document.addEventListener('DOMContentLoaded', () => {
    const raceSelect = document.getElementById('race');
    const classSelect = document.getElementById('class');
    const backgroundSelect = document.getElementById('background');
    const genderSelect = document.getElementById('gender');
    const form = document.getElementById('character-form');
    const resultDiv = document.getElementById('character-output');

    const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Tiefling'];
    const classes = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Barbarian', 'Bard'];
    const backgrounds = ['Noble', 'Soldier', 'Sage', 'Criminal', 'Folk Hero'];

    // Base stats for each class
    const classBaseStats = {
        Fighter:     { STR: 15, DEX: 13, CON: 14, INT: 8,  WIS: 10, CHA: 10 },
        Wizard:      { STR: 8,  DEX: 14, CON: 13, INT: 15, WIS: 12, CHA: 10 },
        Rogue:       { STR: 10, DEX: 15, CON: 13, INT: 12, WIS: 10, CHA: 10 },
        Cleric:      { STR: 10, DEX: 10, CON: 13, INT: 12, WIS: 15, CHA: 10 },
        Barbarian:   { STR: 15, DEX: 13, CON: 14, INT: 8,  WIS: 10, CHA: 8  },
        Bard:        { STR: 8,  DEX: 13, CON: 12, INT: 10, WIS: 10, CHA: 15 }
    };

    // Racial bonuses
    const raceBonuses = {
        Human:      { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 },
        Elf:        { STR: 0, DEX: 2, CON: 0, INT: 0, WIS: 0, CHA: 0 },
        Dwarf:      { STR: 0, DEX: 0, CON: 2, INT: 0, WIS: 0, CHA: 0 },
        Halfling:   { STR: 0, DEX: 2, CON: 0, INT: 0, WIS: 0, CHA: 0 },
        Dragonborn: { STR: 2, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 1 },
        Tiefling:   { STR: 0, DEX: 0, CON: 0, INT: 1, WIS: 0, CHA: 2 }
    };

    // Fantasy name parts by race and gender
    const nameParts = {
        Human: {
            male:   { first: ['Aric', 'Darin', 'Joren', 'Bram', 'Cedric', 'Gavin', 'Roland', 'Theron', 'Lucan', 'Marcus'], last: ['Stone', 'Rivers', 'Bright', 'Hale', 'Ward', 'Dale', 'Carver', 'Mason', 'Bennett', 'Fletcher'] },
            female: { first: ['Lysa', 'Mira', 'Tessa', 'Elena', 'Rowan', 'Seren', 'Kara', 'Vivian', 'Selene', 'Maris'], last: ['Stone', 'Rivers', 'Bright', 'Hale', 'Ward', 'Dale', 'Carver', 'Mason', 'Bennett', 'Fletcher'] },
            neutral: { first: ['Ari', 'Morgan', 'Robin', 'Sage', 'Rene', 'Jules', 'Sky', 'Rowan', 'Taylor', 'Quinn'], last: ['Stone', 'Rivers', 'Bright', 'Hale', 'Ward', 'Dale', 'Carver', 'Mason', 'Bennett', 'Fletcher'] }
        },
        Elf: {
            male:   { first: ['Elaran', 'Faelar', 'Thalion', 'Aeris', 'Syllin', 'Rolen', 'Heian', 'Laucian', 'Soveliss', 'Varis'], last: ['Galadon', 'Siannodel', 'Amakiir', 'Holimion', 'Liadon', 'Xiloscient', 'Ilphelkiir', 'Nailo', 'Meliamne', 'Oloren'] },
            female: { first: ['Sylva', 'Lia', 'Keya', 'Shalana', 'Aeris', 'Enna', 'Naivara', 'Thia', 'Althaea', 'Quelenna'], last: ['Galadon', 'Siannodel', 'Amakiir', 'Holimion', 'Liadon', 'Xiloscient', 'Ilphelkiir', 'Nailo', 'Meliamne', 'Oloren'] },
            neutral: { first: ['Aelar', 'Bryn', 'Lash', 'Rinn', 'Sage', 'Vesryn', 'Quarion', 'Soryn', 'Taran', 'Zel'], last: ['Galadon', 'Siannodel', 'Amakiir', 'Holimion', 'Liadon', 'Xiloscient', 'Ilphelkiir', 'Nailo', 'Meliamne', 'Oloren'] }
        },
        Dwarf: {
            male:   { first: ['Borin', 'Thrain', 'Kildrak', 'Barendd', 'Harbek', 'Orsik', 'Rurik', 'Taklinn', 'Vondal', 'Dain'], last: ['Ironfist', 'Bronzebeard', 'Stonefoot', 'Fireforge', 'Battlehammer', 'Dankil', 'Holderhek', 'Loderr', 'Ungart', 'Torunn'] },
            female: { first: ['Dagna', 'Helja', 'Vistra', 'Eldeth', 'Gunnloda', 'Hlin', 'Kathra', 'Riswynn', 'Sannl', 'Torbera'], last: ['Ironfist', 'Bronzebeard', 'Stonefoot', 'Fireforge', 'Battlehammer', 'Dankil', 'Holderhek', 'Loderr', 'Ungart', 'Torunn'] },
            neutral: { first: ['Ari', 'Bryn', 'Darr', 'Kari', 'Lyn', 'Marn', 'Norr', 'Rinn', 'Sage', 'Torr'], last: ['Ironfist', 'Bronzebeard', 'Stonefoot', 'Fireforge', 'Battlehammer', 'Dankil', 'Holderhek', 'Loderr', 'Ungart', 'Torunn'] }
        },
        Halfling: {
            male:   { first: ['Pip', 'Milo', 'Roscoe', 'Merric', 'Alton', 'Corrin', 'Eldon', 'Finnan', 'Garret', 'Lyle'], last: ['Tealeaf', 'Goodbarrel', 'Underbough', 'Greenbottle', 'Brushgather', 'Highhill', 'Hilltopple', 'Thorngage', 'Tosscobble', 'Leagallow'] },
            female: { first: ['Seraphina', 'Lavinia', 'Jillian', 'Bree', 'Callie', 'Euphemia', 'Poppy', 'Tara', 'Verna', 'Wenna'], last: ['Tealeaf', 'Goodbarrel', 'Underbough', 'Greenbottle', 'Brushgather', 'Highhill', 'Hilltopple', 'Thorngage', 'Tosscobble', 'Leagallow'] },
            neutral: { first: ['Ari', 'Bryn', 'Dove', 'Jules', 'Lyn', 'Marn', 'Pip', 'Rinn', 'Sage', 'Torr'], last: ['Tealeaf', 'Goodbarrel', 'Underbough', 'Greenbottle', 'Brushgather', 'Highhill', 'Hilltopple', 'Thorngage', 'Tosscobble', 'Leagallow'] }
        },
        Dragonborn: {
            male:   { first: ['Rhogar', 'Medrash', 'Kriv', 'Balasar', 'Donaar', 'Ghesh', 'Heskan', 'Nadarr', 'Pandjed', 'Patrin'], last: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Kepeshkmolik', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit', 'Norixius', 'Ophinshtalajiir', 'Shestendeliath'] },
            female: { first: ['Akra', 'Nala', 'Sora', 'Biri', 'Daar', 'Findex', 'Harann', 'Jheri', 'Mishann', 'Nuthra'], last: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Kepeshkmolik', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit', 'Norixius', 'Ophinshtalajiir', 'Shestendeliath'] },
            neutral: { first: ['Ari', 'Bryn', 'Darr', 'Jules', 'Kari', 'Lyn', 'Marn', 'Norr', 'Rinn', 'Torr'], last: ['Clethtinthiallor', 'Daardendrian', 'Delmirev', 'Kepeshkmolik', 'Turnuroth', 'Verthisathurgiesh', 'Yarjerit', 'Norixius', 'Ophinshtalajiir', 'Shestendeliath'] }
        },
        Tiefling: {
            male:   { first: ['Akmenos', 'Leucis', 'Melech', 'Mordai', 'Skamos', 'Therai', 'Zariel', 'Caim', 'Damakos', 'Kairon'], last: ['Astaroth', 'Levatra', 'Seregon', 'Vexx', 'Zolfura', 'Kairon', 'Barakas', 'Criella', 'Havoc', 'Rilynn'] },
            female: { first: ['Lilith', 'Makaria', 'Orianna', 'Akta', 'Bryseis', 'Damaia', 'Ea', 'Nemeia', 'Rieta', 'Zara'], last: ['Astaroth', 'Levatra', 'Seregon', 'Vexx', 'Zolfura', 'Kairon', 'Barakas', 'Criella', 'Havoc', 'Rilynn'] },
            neutral: { first: ['Ari', 'Bryn', 'Jules', 'Kari', 'Lyn', 'Marn', 'Norr', 'Rinn', 'Sage', 'Torr'], last: ['Astaroth', 'Levatra', 'Seregon', 'Vexx', 'Zolfura', 'Kairon', 'Barakas', 'Criella', 'Havoc', 'Rilynn'] }
        }
    };

    function populateSelect(selectElement, options) {
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
    }

    // Remove the populateSelect calls if you want to use static options from HTML
    // Otherwise, comment out the next four lines:
    // populateSelect(raceSelect, races);
    // populateSelect(classSelect, classes);
    // populateSelect(backgroundSelect, backgrounds);
    // populateSelect(specializationSelect, specializations);

    function randomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function generateName(race, gender) {
        const genderKey = gender === 'male' ? 'male' : gender === 'female' ? 'female' : 'neutral';
        const parts = (nameParts[race] && nameParts[race][genderKey]) || nameParts['Human']['neutral'];
        return randomFromArray(parts.first) + ' ' + randomFromArray(parts.last);
    }

    function generateBackstory(race, charClass, background) {
        // Pools of random elements for variety
        const events = [
            'survived a great war',
            'discovered a hidden talent for magic',
            'lost their family to a dragon attack',
            'was exiled from their homeland',
            'found a mysterious artifact',
            'saved a village from bandits',
            'was raised by wolves',
            'escaped from a notorious prison',
            'was blessed by a wandering deity',
            'grew up among thieves and cutthroats'
        ];
        const traits = [
            'brave but reckless',
            'cunning and resourceful',
            'kind-hearted but naive',
            'stoic and determined',
            'quick-witted and charming',
            'brooding and mysterious',
            'fiercely loyal to friends',
            'haunted by their past',
            'always seeking knowledge',
            'driven by revenge'
        ];
        const goals = [
            'to restore their family honor',
            'to uncover ancient secrets',
            'to become a legendary hero',
            'to protect the innocent',
            'to amass great wealth',
            'to find true love',
            'to master their magical abilities',
            'to defeat a powerful nemesis',
            'to explore the unknown',
            'to unite warring factions'
        ];

        // Pick random elements
        const event = randomFromArray(events);
        const trait = randomFromArray(traits);
        const goal = randomFromArray(goals);

        // Compose a more imaginative backstory
        return `Once, this ${race.toLowerCase()} ${background.toLowerCase()} ${event}. Now, as a ${trait} ${charClass.toLowerCase()}, their greatest ambition is ${goal}.`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting

        const selectedRace = capitalize(raceSelect.value);
        const selectedClass = capitalize(classSelect.value);
        const selectedBackground = capitalize(backgroundSelect.value);
        const selectedGender = genderSelect.value;

        // Get base stats and racial bonuses
        const baseStats = classBaseStats[selectedClass];
        const bonuses = raceBonuses[selectedRace];

        if (!baseStats || !bonuses) {
            resultDiv.innerHTML = "Invalid class or race selection.";
            return;
        }

        // Calculate final stats
        const finalStats = {};
        for (let stat in baseStats) {
            finalStats[stat] = baseStats[stat] + (bonuses[stat] || 0);
        }

        // Generate name and backstory
        const characterName = generateName(selectedRace, selectedGender);
        const backstory = generateBackstory(selectedRace, selectedClass, selectedBackground);

        // Generate additional fields
        // Money (random 2d4 x 10 gold)
        const gold = (Math.floor(Math.random() * 4 + 1) + Math.floor(Math.random() * 4 + 1)) * 10;

        // Equipment by class (simple example)
        const classEquipment = {
            Fighter: ['Chain Mail', 'Longsword', 'Shield', 'Explorer\'s Pack'],
            Wizard: ['Spellbook', 'Quarterstaff', 'Component Pouch', 'Scholar\'s Pack'],
            Rogue: ['Leather Armor', 'Dagger', 'Shortbow', 'Burglar\'s Pack'],
            Cleric: ['Mace', 'Scale Mail', 'Holy Symbol', 'Priest\'s Pack'],
            Barbarian: ['Greataxe', 'Javelin (4)', 'Explorer\'s Pack'],
            Bard: ['Lute', 'Leather Armor', 'Rapier', 'Diplomat\'s Pack']
        };
        const equipment = classEquipment[selectedClass] || ['Common Clothes', 'Backpack'];

        // Health (HP): base by class + CON modifier
        const classBaseHP = {
            Fighter: 10, Wizard: 6, Rogue: 8, Cleric: 8, Barbarian: 12, Bard: 8
        };
        const conMod = Math.floor((finalStats.CON - 10) / 2);
        const hp = (classBaseHP[selectedClass] || 8) + conMod;

        // Initiative = DEX modifier
        const dexMod = Math.floor((finalStats.DEX - 10) / 2);
        const initiative = (dexMod >= 0 ? '+' : '') + dexMod;

        // Skills by class/background (simple sample)
        const classSkills = {
            Fighter: ['Athletics', 'Intimidation'],
            Wizard: ['Arcana', 'History'],
            Rogue: ['Stealth', 'Acrobatics'],
            Cleric: ['Religion', 'Insight'],
            Barbarian: ['Survival', 'Animal Handling'],
            Bard: ['Performance', 'Persuasion']
        };
        const backgroundSkills = {
            Noble: ['History', 'Persuasion'],
            Soldier: ['Athletics', 'Intimidation'],
            Sage: ['Arcana', 'History'],
            Criminal: ['Stealth', 'Deception'],
            'Folk Hero': ['Animal Handling', 'Survival']
        };
        const skills = [
            ...(classSkills[selectedClass] || []),
            ...(backgroundSkills[selectedBackground] || [])
        ];

        // Spells, cantrips, and spell slots for spellcasting classes
        const classSpells = {
            Wizard: {
                slots: 2,
                cantrips: ['Prestidigitation', 'Mage Hand', 'Ray of Frost', 'Light', 'Minor Illusion', 'Fire Bolt', 'Message', 'Chill Touch'],
                spells: ['Magic Missile', 'Shield', 'Mage Armor', 'Sleep', 'Detect Magic', 'Burning Hands', 'Identify', 'Charm Person']
            },
            Cleric: {
                slots: 2,
                cantrips: ['Guidance', 'Sacred Flame', 'Thaumaturgy', 'Spare the Dying', 'Light', 'Resistance'],
                spells: ['Cure Wounds', 'Bless', 'Shield of Faith', 'Guiding Bolt', 'Detect Evil and Good', 'Sanctuary', 'Healing Word', 'Command']
            },
            Bard: {
                slots: 2,
                cantrips: ['Vicious Mockery', 'Friends', 'Mage Hand', 'Minor Illusion', 'Dancing Lights', 'Message'],
                spells: ['Healing Word', 'Dissonant Whispers', 'Tasha\'s Hideous Laughter', 'Sleep', 'Faerie Fire', 'Thunderwave', 'Charm Person', 'Heroism']
            }
        };
        // Spell and cantrip descriptions
        const spellDescriptions = {
            // Wizard Cantrips
            'Prestidigitation': 'Performs minor magical tricks that novice spellcasters use for practice.',
            'Mage Hand': 'A spectral, floating hand appears at a point you choose within range.',
            'Ray of Frost': 'A frigid beam of blue-white light streaks toward a creature, dealing cold damage.',
            'Light': 'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light.',
            'Minor Illusion': 'You create a sound or an image of an object within range.',
            'Fire Bolt': 'You hurl a mote of fire at a creature or object within range.',
            'Message': 'You point your finger toward a creature and whisper a message that only they can hear.',
            'Chill Touch': 'You create a ghostly, skeletal hand in the space of a creature within range.',
            // Wizard Spells
            'Magic Missile': 'You create three glowing darts of magical force, each hitting a creature of your choice.',
            'Shield': 'An invisible barrier of magical force appears and protects you.',
            'Mage Armor': 'You touch a willing creature who isn’t wearing armor, and a magical force protects them.',
            'Sleep': 'This spell sends creatures into a magical slumber.',
            'Detect Magic': 'For the duration, you sense the presence of magic within 30 feet of you.',
            'Burning Hands': 'As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth.',
            'Identify': 'You choose one object and learn its magical properties.',
            'Charm Person': 'You attempt to charm a humanoid you can see within range.',
            // Cleric Cantrips
            'Guidance': 'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check.',
            'Sacred Flame': 'Flame-like radiance descends on a creature you can see within range.',
            'Thaumaturgy': 'You manifest a minor wonder, a sign of supernatural power.',
            'Spare the Dying': 'You touch a living creature that has 0 hit points. The creature becomes stable.',
            'Resistance': 'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw.',
            // Cleric Spells
            'Cure Wounds': 'A creature you touch regains a number of hit points.',
            'Bless': 'You bless up to three creatures of your choice within range.',
            'Shield of Faith': 'A shimmering field appears and surrounds a creature of your choice, granting +2 AC.',
            'Guiding Bolt': 'A flash of light streaks toward a creature of your choice within range.',
            'Detect Evil and Good': 'For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet.',
            'Sanctuary': 'You ward a creature within range against attack.',
            'Healing Word': 'A creature of your choice that you can see regains hit points.',
            'Command': 'You speak a one-word command to a creature you can see within range.',
            // Bard Cantrips
            'Vicious Mockery': 'You unleash a string of insults laced with subtle enchantments at a creature you can see.',
            'Friends': 'For the duration, you have advantage on all Charisma checks directed at one creature.',
            'Dancing Lights': 'You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs.',
            // Bard Spells
            'Dissonant Whispers': 'You whisper a discordant melody that only one creature of your choice can hear.',
            'Tasha\'s Hideous Laughter': 'A creature of your choice perceives everything as hilariously funny and falls into fits of laughter.',
            'Faerie Fire': 'Each object in a 20-foot cube is outlined in blue, green, or violet light.',
            'Thunderwave': 'A wave of thunderous force sweeps out from you.',
            'Heroism': 'A willing creature you touch is imbued with bravery.',
            // Shared
            'Sleep': 'This spell sends creatures into a magical slumber.',
            'Charm Person': 'You attempt to charm a humanoid you can see within range.'
        };

        function spellWithDescription(name) {
            const desc = spellDescriptions[name] ? `<div class=\"spell-desc\">${spellDescriptions[name]}</div>` : '';
            return `<li><span class=\"spell-name\">${name}</span>${desc}</li>`;
        }

        let spellSection = '';
        if (classSpells[selectedClass] && classSpells[selectedClass].cantrips && classSpells[selectedClass].spells) {
            const cantripList = classSpells[selectedClass].cantrips.sort(() => 0.5 - Math.random()).slice(0, 2);
            const spellList = classSpells[selectedClass].spells.sort(() => 0.5 - Math.random()).slice(0, 4);
            spellSection = `
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Spells & Spell Slots</span>
                    <div class=\"sheet-row\">
                        <div><span class=\"label\">Level 1 Slots:</span> <span class=\"value\">${classSpells[selectedClass].slots}</span></div>
                    </div>
                    <div class=\"spells-subsection\"><span class=\"label\">Cantrips:</span>
                        <ul class=\"spells-list\">${cantripList.map(spellWithDescription).join('')}</ul>
                    </div>
                    <div class=\"spells-subsection\"><span class=\"label\">Level 1 Spells:</span>
                        <ul class=\"spells-list\">${spellList.map(spellWithDescription).join('')}</ul>
                    </div>
                </div>
            `;
        }

        // Format stats for display
        const statsString = Object.entries(finalStats)
            .map(([stat, value]) => `<div class=\"stat-block\"><span class=\"stat-label\">${stat}</span><span class=\"stat-value\">${value}</span></div>`)
            .join('');

        // Character sheet display
        const characterSheet = `
            <div class=\"character-sheet\">
                <div class=\"sheet-header\">
                    <div class=\"sheet-name\"><span class=\"label\">Name:</span> <span class=\"value\">${characterName}</span></div>
                    <div class=\"sheet-row\">
                        <div><span class=\"label\">Race:</span> <span class=\"value\">${selectedRace}</span></div>
                        <div><span class=\"label\">Class:</span> <span class=\"value\">${selectedClass}</span></div>
                        <div><span class=\"label\">Gender:</span> <span class=\"value\">${capitalize(selectedGender)}</span></div>
                        <div><span class=\"label\">Background:</span> <span class=\"value\">${selectedBackground}</span></div>
                    </div>
                </div>
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Ability Scores</span>
                    <div class=\"stats-row\">${statsString}</div>
                </div>
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Combat</span>
                    <div class=\"sheet-row\">
                        <div><span class=\"label\">HP:</span> <span class=\"value\">${hp}</span></div>
                        <div><span class=\"label\">Initiative:</span> <span class=\"value\">${initiative}</span></div>
                        <div><span class=\"label\">Gold:</span> <span class=\"value\">${gold} gp</span></div>
                    </div>
                </div>
                ${spellSection}
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Skills</span>
                    <div class=\"sheet-row\">${skills.map(skill => `<div class=\"skill\">${skill}</div>`).join('')}</div>
                </div>
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Equipment</span>
                    <ul class=\"equipment-list\">${equipment.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>
                <div class=\"sheet-section\">
                    <span class=\"section-title\">Backstory</span>
                    <div class=\"backstory\">${backstory}</div>
                </div>
            </div>
        `;

        resultDiv.innerHTML = characterSheet;
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
});