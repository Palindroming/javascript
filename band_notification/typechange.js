function convertToMarkdown(input) {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    
    const markdownLines = [];
    
    const questionMatch = lines[0].match(/Q(\d+)/);
    const questionNumber = questionMatch ? questionMatch[1] : '';
    const question = lines[1];
    
    markdownLines.push(`### Q${questionNumber}. ${question}`);
    markdownLines.push('');
    
    // 선택지 추가 (숫자를 문항 앞으로 이동)
    for (let i = 2; i < lines.length - 2; i += 2) {
      const number = lines[i];
      const content = lines[i + 1];
      markdownLines.push(`${number}. ${content}`);
    }
    
    markdownLines.push('');
    
    const answerLine = lines[lines.length - 2].split('정답 :');
    if (answerLine.length > 1) {
      markdownLines.push(`**${answerLine[0].trim()}정답 : ${answerLine[1].trim()}**`);
    } else {
      markdownLines.push(`**${lines[lines.length - 2]}**`);
    }
    markdownLines.push('');
    
    markdownLines.push('#### 해설');
    markdownLines.push(lines[lines.length - 1]);
    
    return markdownLines.join('\n');
  }
  
  const inputData = `Q1
시뮬레이션의 특징과 관계 없는 것은? 

1
실시스템의 실질적인 구축 없이도 평가 할 수 있다.

2
 비용이 매우 적게 든다.

3
위험성을 내포한 경우 유용하다.

4
해석적인 해를 구하기 어려운 경우 사용한다.

정답입니다.
정답 : 2
시뮬레이션은 초기의 모델링 작업이라든지 그 후 모델에 대한 많은 반복 실험 등으로 인하여 비용이 많이 든다. 그러나 비용이 많이 들지만 그럼에도 불구하고 실제의 시스템을 그대로 실험하는 경우에 비하면 경제적이라고 할 수 있다(비행기 조종사 훈련 시뮬레이터를 생각해보자). 또한 전쟁 등과 같이 실제로 실험할 수 없는 경우 효율적인 방법이라고 할 수 있다.  `;
  
  console.log(convertToMarkdown(inputData));